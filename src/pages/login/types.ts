// 枚举登录注册
export enum StateTypes {
  LOGIN,
  REGISTER
}

export interface RegisterResType {
  code: number;
  message: string;
  data: Record<string, object>;
}

export interface RegisterParams {
  email: string;
  code: string;
}

export interface LoginResType {
  code: number;
  message: string;
  data: Record<string, object>;
}

export interface LoginParams {
  email: string;
  code: string;
}
