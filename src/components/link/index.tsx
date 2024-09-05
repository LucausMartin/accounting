import { FC } from 'react';
import './index.less';

/**
 * @description 链接组件
 * @param  {string } text 链接文本
 */
export const Link: FC<{ text: string }> = ({ text }) => {
  return <span className="link">{text}</span>;
};
