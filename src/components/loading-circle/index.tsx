import { FC } from 'react';
import './index.less';

const LoadingCircle: FC<{ color?: string; sizeScal?: number; className?: string }> = ({
  color = 'black',
  sizeScal = 1,
  className
}) => {
  return (
    <div
      className={`loading ${className}`}
      style={{
        transform: `scale(${sizeScal})`
      }}
    >
      <div
        style={{
          backgroundColor: color,
          borderTopColor: color,
          borderBottomColor: color
        }}
      ></div>
      <div
        style={{
          backgroundColor: color,
          borderTopColor: color,
          borderBottomColor: color
        }}
      ></div>
    </div>
  );
};

export { LoadingCircle };
