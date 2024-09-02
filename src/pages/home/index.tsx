import { CostCard, NewRecord } from './components/index';
import { NoteAlt } from '@mui/icons-material';
import { useState } from 'react';
import './index.less';

const Home = () => {
  const [showNewRecord, setShowNewRecord] = useState(false);

  return (
    <div className="home">
      {showNewRecord && <NewRecord close={() => setShowNewRecord(false)} />}
      <CostCard />
      <div className="new-record-button" onClick={() => setShowNewRecord(true)}>
        <NoteAlt />
        <span>添加新账单</span>
      </div>
    </div>
  );
};

export { Home };
