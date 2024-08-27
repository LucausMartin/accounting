import { FC } from 'react';
import './index.less';

/**
 * @description 带有过渡动画的全屏遮罩弹窗
 * @param {JSX.Element} children
 * @param {() => void} closeEvent
 * @param {boolean} show
 */
export const PopUp: FC<{ children: JSX.Element; closeEvent: () => void; show: boolean }> = ({
  children,
  closeEvent,
  show
}) => {
  return (
    <div
      style={{
        zIndex: show ? 999 : -1,
        opacity: show ? 1 : 0
      }}
      className="pop-up-container"
      onClick={closeEvent}
    >
      <div
        style={{
          transform: `scale(${show ? 1 : 0})`,
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};
