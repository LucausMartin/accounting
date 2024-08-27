import { fetchData, formatResonse } from '@myUtils/fetchData';
import { SERVER_URL } from '@myConstants/index';
import { RegisterParamsType, ResType, LoginParamsType, SendVerificationCodeParamsType } from './types';

/**
 * @description 登录网络服务
 */
class LoginService {
  private readonly url = `${SERVER_URL}/users`;
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  sendVerificationCode = async (email: string, login: boolean) => {
    try {
      const res = await fetchData<ResType, SendVerificationCodeParamsType>(
        'POST',
        {
          url: this.url + '/sendVerificationCode',
          headers: this.headers
        },
        {
          email,
          login
        }
      );
      console.log(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
    }
  };

  /**
   * @description 注册网络请求
   * @param email email
   * @param code 验证码
   * @returns 注册结果
   */
  register = async (email: string, code: string) => {
    const params: RegisterParamsType = {
      email,
      code
    };
    const res = await fetchData<ResType, RegisterParamsType>(
      'POST',
      {
        url: this.url + '/register',
        headers: this.headers
      },
      params
    );
    return formatResonse(res);
  };

  login = async (email: string, code: string) => {
    const params: LoginParamsType = {
      email,
      code
    };
    const res = await fetchData<ResType, LoginParamsType>(
      'POST',
      {
        url: this.url + '/login',
        headers: this.headers
      },
      params
    );
    return formatResonse(res);
  };
}

export default new LoginService();
