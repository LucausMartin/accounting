import { FC } from 'react';
import './index.less';

const LoadingBall: FC<{ color?: string; sizeScal?: number; className?: string }> = ({
  color = 'black',
  sizeScal = 1,
  className
}) => {
  return (
    <div
      className={`loading-ball ${className}`}
      style={{
        color: color,
        transform: `scale(${sizeScal})`
      }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export { LoadingBall };
