// 枚举登录注册
export enum StateTypes {
  LOGIN,
  REGISTER
}

export interface ResType {
  code: number;
  message: string;
  data: {
    success: true;
  };
}

export interface RegisterParamsType {
  email: string;
  code: string;
}

export interface LoginParamsType {
  email: string;
  code: string;
}

export interface SendVerificationCodeParamsType {
  email: string;
  login: boolean;
}
