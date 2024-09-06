import { FC, TouchEventHandler, useEffect, useRef, useState, HTMLAttributes } from 'react';
import './index.less';
/**
 * @description 移动面板
 * @param { number } actionDistance 触发移动的距离
 * @param { number } gap 间隔
 * @param { HTMLAttributes.style } style 整体样式
 * @param { JSX.Element[] } children 子元素
 * @param { (number) => void } moveCallback 移动回调
 * @param { number } currentIndex 当前索引
 */
const MovePanel: FC<{
  actionDistance: number;
  gap: number;
  children: JSX.Element[];
  style?: HTMLAttributes<HTMLDivElement>['style'];
  moveCallback?: (index: number) => void;
  currentIndex?: number;
}> = ({ actionDistance, gap, children, style, moveCallback, currentIndex }) => {
  // 触摸开始位置
  const [touchStartLocation, setTouchStartLocation] = useState<number | null>(null);
  // 跟随移动距离
  const [followDistance, setFollowDistance] = useState<number>(0);
  // 移动距离
  const [moveDistance, setMoveDistance] = useState<number>(0);
  // 移动方向
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  // 是否触摸结束
  const [touchOver, setTouchOver] = useState<boolean>(true);
  // 是否开始计算
  const [startCompute, setStartCompute] = useState<boolean>(false);
  // 触摸过程结束后已经移动的距离
  const [haveMoveDistance, setHaveMoveDistance] = useState<number>(0);
  // 面板ref（为了得到宽度）
  const panelRef = useRef<HTMLDivElement>(null);
  // 当前面板索引
  const [index, setIndex] = useState<number>(0);

  /**
   * @description 触摸开始
   * @param { TouchEvent<HTMLDivElement> } e 触摸事件
   */
  const touchStart: TouchEventHandler<HTMLDivElement> = e => {
    setTouchStartLocation(e.touches[0].clientX);
  };

  /**
   * @description 触摸移动
   * @param { TouchEvent<HTMLDivElement> } e 触摸事件
   */
  const touchMove: TouchEventHandler<HTMLDivElement> = e => {
    // 如果没有开始触摸就退出
    if (!touchStartLocation) {
      return;
    }
    // 如果移动距离大于触发距离就开始触摸状态
    if (Math.abs(e.touches[0].clientX - touchStartLocation) > actionDistance) {
      setTouchOver(false);
    }
    // 计算相对于触摸开始位置的偏移量
    setMoveDistance(Math.abs(e.touches[0].clientX - touchStartLocation));
    // 计算方向
    if (e.touches[0].clientX > touchStartLocation) {
      setDirection('right');
    } else {
      setDirection('left');
    }
  };

  /**
   * @description 触摸结束事件
   */
  const touchEnd = () => {
    // 重置状态
    setTouchStartLocation(null);
    setTouchOver(true);
    // 保证动画结束后再重置状态
    setTimeout(() => {
      setTouchOver(false);
    }, 300);
    setFollowDistance(0);
    setStartCompute(false);

    if (!panelRef.current) {
      return;
    }
    // 计算一个面板的宽度
    const panelWidth = panelRef.current.clientWidth;
    // 如果移动距离大于面板宽度的五分之一就移动一个面板
    if (moveDistance > panelWidth / 5) {
      if (direction === 'left') {
        // 边界判断
        if (haveMoveDistance - (panelWidth + gap) < -(panelWidth + gap) * (children.length - 1)) {
          return;
        }
        setHaveMoveDistance(pre => pre - (panelWidth + gap));
      } else {
        // 边界判断
        if (haveMoveDistance + panelWidth + gap > 0) {
          return;
        }
        setHaveMoveDistance(pre => pre + panelWidth + gap);
      }
    }
  };

  useEffect(() => {
    if (!panelRef.current) {
      return;
    }
    // 移动回调返回当前面板索引
    if (moveCallback) {
      moveCallback(parseInt(String(Math.abs(haveMoveDistance / (panelRef.current.clientWidth + gap)))));
      // 设置当前面板索引为窗口大小变化做计算
      setIndex(parseInt(String(Math.abs(haveMoveDistance / (panelRef.current.clientWidth + gap)))));
    }
  }, [haveMoveDistance]);

  useEffect(() => {
    if (!touchOver) {
      // 在起始触摸位置树枝上补偿触发距离
      if (direction === 'left') {
        setTouchStartLocation(pre => (pre as number) - actionDistance);
      } else {
        setTouchStartLocation(pre => (pre as number) + actionDistance);
      }
      // 标识，补偿后才开始计算跟随移动距离
      setStartCompute(true);
    }
  }, [touchOver]);

  useEffect(() => {
    if (!touchStartLocation) {
      return;
    }
    // 开始计算跟随移动距离
    if (startCompute) {
      if (direction === 'left') {
        setFollowDistance(-moveDistance);
      } else {
        setFollowDistance(+moveDistance);
      }
    }
  }, [moveDistance]);

  // 窗口大小变化
  useEffect(() => {
    // 根据当前面板索引重新计算移动距离
    window.onresize = () => {
      if (!panelRef.current) {
        return;
      }
      const panelWidth = panelRef.current.clientWidth;
      setHaveMoveDistance(-(panelWidth + gap) * index);
    };

    return () => {
      window.onresize = null;
    };
  }, [index]);

  useEffect(() => {
    if (currentIndex === undefined) {
      return;
    }
    setIndex(currentIndex);
    if (!panelRef.current) {
      return;
    }
    // 外部控制当前面板索引
    const panelWidth = panelRef.current.clientWidth;
    setHaveMoveDistance(-(panelWidth + gap) * currentIndex);
    setTouchOver(true);
    setTimeout(() => {
      setTouchOver(false);
    }, 300);
  }, [currentIndex]);

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      <div
        className="move-panel"
        style={{
          width: `${children.length * 100}%`,
          padding: `0 ${gap / 2}px`,
          gap: `${gap}px`,
          transform: `translateX(${haveMoveDistance + followDistance}px)`,
          transition: touchOver ? 'transform 0.3s ease-in-out' : 'none',
          ...style
        }}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        {children.map((item, index) => (
          <div ref={panelRef} key={index} className="touch-move-panel">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export { MovePanel };
