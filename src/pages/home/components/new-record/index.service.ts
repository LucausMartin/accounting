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

  /**
   * @description 获取支出种类父级
   * @returns 请求结果
   */
  async getExpensesKindParents() {
    try {
      const res = await fetchData<GetKindParentsResType>('GET', {
        url: this.url + '/get-expenses-kinds-parents-by-email',
        headers: this.headers
      });
      return formatResonse<GetKindParentsResType>(res);
    } catch (error) {
      console.log(error);
      return formatResonse<GetKindParentsResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  }

  /**
   * @description 获取收入种类父级
   * @returns 请求结果
   */
  async getIncomeKindParents() {
    try {
      const res = await fetchData<GetKindParentsResType>('GET', {
        url: this.url + '/get-income-kinds-parents-by-email',
        headers: this.headers
      });
      return formatResonse<GetKindParentsResType>(res);
    } catch (error) {
      console.log(error);
      return formatResonse<GetKindParentsResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  }
}

export default new NewRecordService();
