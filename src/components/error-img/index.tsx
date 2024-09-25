import { FC } from 'react';
import NetworkErrorIcon from '@myAssets/error-network.svg';
import './index.less';

const ErrorImg: FC<{
  fetchData: () => void;
  message?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}> = ({ fetchData, message = '请点击重试', style, imgStyle }) => {
  return (
    <div className="network-error" style={style} onClick={fetchData}>
      <img style={imgStyle} src={NetworkErrorIcon} alt="network error" />
      <span>{message}</span>
    </div>
  );
};

export { ErrorImg };
