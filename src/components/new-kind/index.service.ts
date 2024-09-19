import { SERVER_URL, HTTP_STATUS_ENUM } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import {
  UploadResType,
  SystemIconResType,
  UserIconsResType,
  CreateKindsParentParamsType,
  CreateKindsParentResType,
  CreateKindChildParamsType,
  CreateKindChildResType
} from './types';

/**
 * @description 新种类服务
 */
class NewKindService {
  // 添加父级种类请求配置
  private readonly kindsParentsUrl = `${SERVER_URL}/kinds-parents`;
  private readonly kindsParentsHeaders = {
    'Content-Type': 'application/json'
  };
  // 添加子级种类请求配置
  private readonly kindsChildrensUrl = `${SERVER_URL}/kinds-children`;
  private readonly kindsChildrenHeaders = {
    'Content-Type': 'application/json'
  };

  // 系统图标请求配置
  private readonly systemIconsUrl = `${SERVER_URL}/system-icons`;
  private readonly systemIconsHeaders = {
    'Content-Type': 'application/json'
  };

  // 用户图标请求配置
  private readonly userIconsUrl = `${SERVER_URL}/upload`;
  private readonly userIconsHeaders = {
    'Content-Type': 'application/json'
  };

  // 上传文件请求配置
  private readonly uploadFileUrl = `${SERVER_URL}/upload`;
  private readonly uploadFileHeaders = {
    'Content-Type': ''
  };

  /**
   * @description 上传 SVG 文件
   * @param { FormData } formData 文件数据
   * @returns 上传结果
   */
  uploadSVG = async (formData: FormData) => {
    try {
      const res = await fetchData<UploadResType, FormData>(
        'POST',
        {
          url: this.uploadFileUrl,
          headers: this.uploadFileHeaders
        },
        formData
      );
      return formatResonse(res);
    } catch {
      return formatResonse<UploadResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };

  /**
   * @description 获取所有系统图标
   * @returns 获取结果
   */
  getAllSystemIcons = async () => {
    try {
      const res = await fetchData<SystemIconResType>('GET', {
        url: this.systemIconsUrl + '/all',
        headers: this.systemIconsHeaders
      });
      return formatResonse<SystemIconResType>(res);
    } catch (err) {
      console.warn(err);
      return formatResonse<SystemIconResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };

  /**
   * @description 获取用户所有图标
   * @returns 获取结果
   */
  getAllIconsbyUser = async () => {
    try {
      const res = await fetchData<UserIconsResType>('GET', {
        url: this.userIconsUrl + '/get-all-icons-by-user',
        headers: this.userIconsHeaders
      });
      return formatResonse<UserIconsResType>(res);
    } catch {
      return formatResonse<UserIconsResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };

  /**
   * @description 创建父级种类
   * @param { string } name 种类名称
   * @param { string } fileName 文件名
   * @param { string } svgCode svg 代码
   * @returns 创建结果
   */
  createKindsParent = async (name: string, fileName: string, svgCodeId: string, type: number) => {
    try {
      const params = {
        name,
        file_name: fileName === '' ? null : fileName,
        svg_code_id: svgCodeId === '' ? null : svgCodeId,
        type: type
      };
      const res = await fetchData<CreateKindsParentResType, CreateKindsParentParamsType>(
        'POST',
        {
          url: this.kindsParentsUrl + '/create-kinds-parent',
          headers: this.kindsParentsHeaders
        },
        params
      );
      return formatResonse<CreateKindsParentResType>(res);
    } catch {
      return formatResonse<CreateKindsParentResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };

  createKindsChild = async (name: string, fileName: string, svgCodeId: string, parentId: string) => {
    try {
      const params = {
        name,
        file_name: fileName === '' ? null : fileName,
        svg_code_id: svgCodeId === '' ? null : svgCodeId,
        parent_id: parentId
      };
      const res = await fetchData<CreateKindChildResType, CreateKindChildParamsType>(
        'POST',
        {
          url: this.kindsChildrensUrl + '/create-kinds-child',
          headers: this.kindsChildrenHeaders
        },
        params
      );
      return formatResonse<CreateKindChildResType>(res);
    } catch {
      return formatResonse<CreateKindChildResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };
}

export default new NewKindService();
