import { SERVER_URL, HTTP_STATUS_ENUM } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { UploadResType, SystemIconResType } from './types';

/**
 * @description 新种类服务
 */
class NewKindService {
  // 添加父级种类请求配置
  private readonly kindsParentsUrl = `${SERVER_URL}/kinds-parents`;
  private readonly kindsParentsHeaders = {
    'Content-Type': 'application/json'
  };

  // 系统图标请求配置
  private readonly systemIconsUrl = `${SERVER_URL}/system-icons`;
  private readonly systemIconsHeaders = {
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
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
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
    } catch (error) {
      console.log(error);
      return formatResonse<SystemIconResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };
}

export default new NewKindService();
