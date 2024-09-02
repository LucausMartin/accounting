import { FC } from 'react';

/**
 * @description 金额组件
 * @param {number} cost 金额
 */
const CostNumber: FC<{ cost: number; className: string }> = ({ cost, className }) => {
  return (
    <span
      style={{
        color: cost > 0 ? 'rgb(35 213 42)' : 'red'
      }}
      className={className}
    >
      {cost}
    </span>
  );
};

export { CostNumber };
