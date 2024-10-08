import { FC, useEffect, useState } from 'react';
import './index.less';

/**
 * @description 带有过渡动画的全屏遮罩弹窗
 * @param { JSX.Element } children 子元素
 * @param { () => void } closeEvent 关闭事件
 * @param { boolean } show 是否显示
 */
export const PopUp: FC<{ children: JSX.Element; closeEvent: () => void; show: boolean }> = ({
  children,
  closeEvent,
  show
}) => {
  const [mouseUp, setMouseUp] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const close = () => {
    closeEvent();
  };

  const clear = () => {
    setMouseDown(false);
    setMouseUp(false);
  };

  // 保证各种拖拽和点击都是正确的逻辑
  useEffect(() => {
    if (show) {
      setMouseUp(false);
      setMouseDown(false);
    }
  }, [show]);

  return (
    <div
      style={{
        zIndex: show ? 999 : -1,
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none'
      }}
      className="pop-up-container"
      onClick={mouseUp && mouseDown ? close : clear}
      onMouseUp={() => setMouseUp(true)}
      onMouseDown={() => setMouseDown(true)}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        onMouseDown={e => {
          e.stopPropagation();
        }}
        onMouseUp={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{
          zIndex: 1000,
          transform: `scale(${show ? 1 : 0})`,
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};
