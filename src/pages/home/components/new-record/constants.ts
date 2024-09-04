import { NEW_KIND_TYPE_ENUM } from '@myConstants/index';

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
