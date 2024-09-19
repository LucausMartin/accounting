import { NEW_KIND_TYPE_ENUM } from '@myConstants/index';

/**
 * @description 新帐单页面类型列表
 */
export const KINDLIST = [
  {
    id: 0,
    type: NEW_KIND_TYPE_ENUM.EXPENSES,
    title: '支出',
    parents: true
  },
  {
    id: 1,
    type: NEW_KIND_TYPE_ENUM.INCOME,
    title: '收入',
    parents: true
  }
];

/**
 * @description 获取种类父级请求错误类型枚举
 */
export const enum GetKindsParentsByEmailErrorTypeEnums {
  FAILED_TO_GET = 1,
  NETWORK = 0
}

export enum AddAccountItemErrorTypeEnums {
  FAILED_TO_ADD = 1,
  NETWORK = 0
}
