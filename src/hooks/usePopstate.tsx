import { useEffect } from 'react';

/**
 * @description 非叶子组件监听返回事件逻辑
 * @param { boolean }childrenShowState 子组件是否显示状态
 * @param { (...args: any[]) => void } callBack 返回事件
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePopstateNotLeave = (childrenShowState: boolean, callBack: (...args: any[]) => void) => {
  /**
   * @description 监听返回事件
   */
  useEffect(() => {
    window.addEventListener('popstate', callBack, true);
    return () => {
      window.removeEventListener('popstate', callBack, true);
    };
  }, []);

  useEffect(() => {
    if (childrenShowState) {
      window.history.pushState(null, '', window.location.href);
      window.removeEventListener('popstate', callBack, true);
    } else {
      window.addEventListener('popstate', callBack, true);
    }
  }, [childrenShowState]);
};

/**
 * @description 叶子组件监听返回事件逻辑
 * @param { (...args: any[]) => void } callBack 返回事件
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePopstateLeave = (callBack: (...args: any[]) => void) => {
  /**
   * @description 监听返回事件
   */
  useEffect(() => {
    window.addEventListener('popstate', callBack, true);
    return () => {
      window.removeEventListener('popstate', callBack, true);
    };
  }, []);
};
