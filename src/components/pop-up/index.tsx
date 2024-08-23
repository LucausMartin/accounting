import { FC } from 'react';
import './index.less';

export const PopUp: FC<{ children: JSX.Element; closeEvent: () => void }> = ({ children, closeEvent }) => {
  return (
    <div className="pop-up-container" onClick={closeEvent}>
      {children}
    </div>
  );
};
