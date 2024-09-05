import { FC } from 'react';

/**
 * @description 金额组件
 * @param { number | string } cost 金额
 * @param { string } className 类名
 */
const CostNumber: FC<{ cost: number | string; className: string }> = ({ cost, className }) => {
  return (
    <span
      style={{
        color: Number(cost) >= 0 ? 'rgb(35 213 42)' : 'red'
      }}
      className={className}
    >
      {cost}
    </span>
  );
};

export { CostNumber };
