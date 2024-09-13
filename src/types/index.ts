/**
 * @description 根据官方类型自定义的 React SetState 类型
 */
export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * @description 账单类型
 */
export interface AccountType {
  id: string;
  name: string;
}
