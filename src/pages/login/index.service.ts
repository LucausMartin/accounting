import { fetchData, formatResonse } from '@myUtils/fetchData';
import { SERVER_URL } from '@myConstants/index';
import { RegisterParams, RegisterResType, LoginParams, LoginResType } from './types';

class LoginService {
  private readonly url = `${SERVER_URL}/users`;
  private readonly headers = {
    'Content-Type': 'application/json'
  };
  register = async (email: string, code: string) => {
    const params: RegisterParams = {
      email,
      code
    };
    const res = await fetchData<RegisterResType, RegisterParams>(
      'POST',
      {
        url: this.url + '/registers',
        headers: this.headers
      },
      params
    );
    return formatResonse(res);
  };

  login = async (email: string, code: string) => {
    const params: LoginParams = {
      email,
      code
    };
    const res = await fetchData<LoginResType, LoginParams>(
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
