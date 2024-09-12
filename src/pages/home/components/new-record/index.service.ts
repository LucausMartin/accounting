import { fetchData, formatResonse } from '@myUtils/fetchData';
import { SERVER_URL, HTTP_STATUS_ENUM } from '@myConstants/index';
import { GetKindParentsResType } from './types';

/**
 * @description 登录网络服务
 */
class NewRecordService {
  private readonly url = `${SERVER_URL}/kinds-parents`;
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async getKindParents() {
    try {
      const res = await fetchData<GetKindParentsResType>('GET', {
        url: this.url + '/get-kinds-parents-by-email',
        headers: this.headers
      });
      return formatResonse(res);
    } catch (error) {
      console.log(error);
      return formatResonse({ code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new NewRecordService();
