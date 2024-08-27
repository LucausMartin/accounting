import localforage from 'localforage';
import { HTTP_STATUS } from '@myConstants/index';

// 网络请求封装，第一个范型是返回的数据类型，第二个范型是请求参数的类型
type Options = {
  url: string;
  headers?: {
    'Content-Type': string;
  };
};

export type successNumber = HTTP_STATUS.OK | HTTP_STATUS.CREATED;
export type failNumber =
  | HTTP_STATUS.BAD_REQUEST
  | HTTP_STATUS.UNAUTHORIZED
  | HTTP_STATUS.FORBIDDEN
  | HTTP_STATUS.NOT_FOUND
  | HTTP_STATUS.CONFLICT
  | HTTP_STATUS.INTERNAL_SERVER_ERROR;

// 函数重载
async function fetchData<Data>(
  method: 'GET',
  options: Options
): Promise<
  | { code: successNumber; message: string; data: Data }
  | {
      code: failNumber;
      message: string;
      data: {
        error_type: number;
      };
    }
>;
async function fetchData<Data, Params>(
  method: 'POST',
  options: Options,
  params: Params
): Promise<
  | { code: successNumber; message: string; data: Data }
  | {
      code: failNumber;
      message: string;
      data: {
        error_type: number;
      };
    }
>;

// 函数实现
async function fetchData<Data, Params>(
  method: 'GET' | 'POST',
  options: Options,
  params?: Params
): Promise<
  | { code: successNumber; message: string; data: Data }
  | {
      code: failNumber;
      message: string;
      data: {
        error_type: number;
      };
    }
> {
  const { url, headers } = options;
  if (method === 'GET') {
    try {
      const tokenValue = await localforage.getItem<string>('token');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': headers ? headers['Content-Type'] : 'application/json',
          Authorization: tokenValue ? `Bearer ${tokenValue}` : ''
        }
      });
      if (response.status === 404) {
        throw new Error('404');
      }
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
  if (method === 'POST') {
    try {
      const tokenValue = await localforage.getItem<string>('token');
      const response = await fetch(url, {
        method: 'POST',
        headers:
          headers === undefined || headers['Content-Type'] === ''
            ? {
                Authorization: tokenValue ? `Bearer ${tokenValue}` : 'Bearer '
              }
            : {
                'Content-Type': headers ? headers['Content-Type'] : 'application/json',
                Authorization: tokenValue ? `Bearer ${tokenValue}` : 'Bearer '
              },
        body: headers && headers['Content-Type'] === '' ? (params as FormData) : JSON.stringify(params)
      });
      if (response.status === 404) {
        throw new Error('404');
      }
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
  throw new Error('method is not supported');
}

/**
 * @description 格式化返回数据
 * @param res 请求回来的数据
 * @returns 格式化后的数据
 */
function formatResonse<ResDataType>(
  res:
    | { code: successNumber; message: string; data: ResDataType }
    | {
        code: failNumber;
        message: string;
        data: {
          error_type: number;
        };
      }
):
  | {
      success: true;
      data: ResDataType;
      message: string;
    }
  | {
      success: false;
      data: { error_type: number };
      message: string;
    } {
  if (isSuccess(res.code)) {
    return {
      success: true,
      data: res.data as ResDataType,
      message: 'success'
    };
  } else {
    return {
      success: false,
      data: res.data as { error_type: number },
      message: res.message
    };
  }
}

/**
 * @description 判断是否是成功的状态码
 * @param value 状态码
 */
const isSuccess = (value: number): value is successNumber => {
  return value === HTTP_STATUS.OK || value === HTTP_STATUS.CREATED;
};

export { fetchData, formatResonse };
