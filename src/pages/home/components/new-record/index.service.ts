import { fetchData, formatResonse } from '@myUtils/fetchData';
import { SERVER_URL, HTTP_STATUS_ENUM } from '@myConstants/index';
import { GetKindParentsResType, AccountAddItemResType, AccountAddItemParamsType } from './types';

/**
 * @description 登录网络服务
 */
class NewRecordService {
  private readonly addKindParentsUrl = `${SERVER_URL}/kinds-parents`;
  private readonly addKindParentsHeaders = {
    'Content-Type': 'application/json'
  };

  private readonly addRecordUrl = `${SERVER_URL}/account-item`;
  private readonly addRecordHeaders = {
    'Content-Type': 'application/json'
  };

  /**
   * @description 获取支出种类父级
   * @returns 请求结果
   */
  async getExpensesKindParents() {
    try {
      const res = await fetchData<GetKindParentsResType>('GET', {
        url: this.addKindParentsUrl + '/get-expenses-kinds-parents-by-email',
        headers: this.addKindParentsHeaders
      });
      return formatResonse<GetKindParentsResType>(res);
    } catch {
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
        url: this.addKindParentsUrl + '/get-income-kinds-parents-by-email',
        headers: this.addKindParentsHeaders
      });
      return formatResonse<GetKindParentsResType>(res);
    } catch {
      return formatResonse<GetKindParentsResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  }

  /**
   * @description 添加新记录
   * @param { AccountAddItemParamsType } params 添加新记录参数
   * @returns 请求结果
   */
  async addNewRecord(params: AccountAddItemParamsType) {
    try {
      const res = await fetchData<AccountAddItemResType, AccountAddItemParamsType>(
        'POST',
        {
          url: this.addRecordUrl + '/add',
          headers: this.addRecordHeaders
        },
        params
      );
      return formatResonse<AccountAddItemResType>(res);
    } catch {
      return formatResonse<AccountAddItemResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  }
}

export default new NewRecordService();
