/**
 * @description 服务器接口地址
 */
export const SERVER_URL = '//localhost:3000/v1';

/**
 * @description 服务器图片静态地址
 */
export const SERVER_IMG_URL = '//localhost:3000';

/**
 * @description 请求返回状态码枚举
 */
export enum HTTP_STATUS_ENUM {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

/**
 * @description 新种类类型枚举
 */
export enum NEW_KIND_TYPE_ENUM {
  EXPENSES = 'expenses',
  INCOME = 'income'
}

/**
 * @description 登录状态枚举
 */
export enum LOGIN_STATE_ENUM {
  LOGIN,
  LOGOUT,
  READY
}
