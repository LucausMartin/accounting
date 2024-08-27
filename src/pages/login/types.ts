export interface RegisterResType {
  success: true;
}

export interface LoginResType {
  success: true;
}

export interface SendVerificationCodeResType {
  success: true;
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
