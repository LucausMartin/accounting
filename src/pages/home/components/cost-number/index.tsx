import { FC } from 'react';
import { NEW_KIND_TYPE_ENUM } from '@myConstants/index';

/**
 * @description 金额组件
 * @param { number | string } cost 金额
 * @param { string } className 类名
 * @param { string } initType 初始类型
 */
const CostNumber: FC<{ cost: number | string; className: string; initType?: NEW_KIND_TYPE_ENUM }> = ({
  cost,
  className,
  initType
}) => {
  const computeStyle = () => {
    if (initType === NEW_KIND_TYPE_ENUM.INCOME) {
      return 'rgb(35 213 42)';
    }
    if (initType === NEW_KIND_TYPE_ENUM.EXPENSES) {
      return 'red';
    }
    if (Number(cost) >= 0) {
      return 'rgb(35 213 42)';
    } else {
      return 'red';
    }
  };
  return (
    <span
      style={{
        color: computeStyle()
      }}
      className={className}
    >
      {cost}
    </span>
  );
};

export { CostNumber };
