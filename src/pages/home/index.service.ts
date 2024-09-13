import { fetchData, formatResonse } from '@myUtils/fetchData';
import { SERVER_URL, HTTP_STATUS_ENUM } from '@myConstants/index';
import { GetAllAccountsResType } from './types';

class HomeService {
  private readonly accountUrl = `${SERVER_URL}/account`;
  private readonly headers = {
    'Content-Type': 'application/json'
  };
  getAccountList = async () => {
    try {
      const res = await fetchData<GetAllAccountsResType>('GET', {
        url: `${this.accountUrl}/get-all`,
        headers: this.headers
      });
      return formatResonse<GetAllAccountsResType>(res);
    } catch (error) {
      console.log(error);
      return formatResonse<GetAllAccountsResType>({
        code: HTTP_STATUS_ENUM.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };
}

export default new HomeService();
