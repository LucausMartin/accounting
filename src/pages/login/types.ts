/**
 * @description 注册请求响应类型
 */
export interface RegisterResType {
  access_token: string;
  refresh_token: string;
}

/**
 * @description 登录请求响应类型
 */
export interface LoginResType {
  accessToken: string;
  refreshToken: string;
}

/**
 * @description 发送验证码请求响应类型
 */
export interface SendVerificationCodeResType {
  success: true;
}

/**
 * @description 注册请求参数类型
 */
export interface RegisterParamsType {
  email: string;
  code: string;
}

/**
 * @description 登录请求参数类型
 */
export interface LoginParamsType {
  email: string;
  code: string;
}

/**
 * @description 发送验证码请求参数类型
 */
export interface SendVerificationCodeParamsType {
  email: string;
  login: boolean;
}
