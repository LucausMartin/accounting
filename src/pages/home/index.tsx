import { CostCard, NewRecord } from './components/index';
import { NoteAlt } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { usePopstateNotLeave } from '@myHooks/usePopstate';
import './index.less';

/**
 * @description 首页
 */
const Home = () => {
  // 是否显示新账单组件
  const [showNewRecord, setShowNewRecord] = useState(false);

  /**
   * @description 返回事件
   */
  const backEvent = useCallback(() => {
    alert('已经是首页');
  }, []);

  // 非叶子组件通用监听返回逻辑
  usePopstateNotLeave(showNewRecord, backEvent);

  return (
    <div className="home">
      <NewRecord close={() => setShowNewRecord(false)} show={showNewRecord} />
      <CostCard />
      <div className="new-record-button" onClick={() => setShowNewRecord(true)}>
        <NoteAlt />
        <span>添加新账单</span>
      </div>
    </div>
  );
};

export { Home };
