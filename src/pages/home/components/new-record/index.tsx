import { Close } from '@mui/icons-material';
import { FC, useState } from 'react';
import { KINDLIST } from './constants';
import './index.less';

const NewRecord: FC<{ close: () => void }> = ({ close }) => {
  const [kind, setKind] = useState(KINDLIST[0].id);
  return (
    <div className="home-new-record">
      <Close className="close" onClick={close} />
      <div
        style={{
          padding: '10px'
        }}
      >
        <div className="kind">
          {KINDLIST.map(({ id, title }) => (
            <div key={id} className="kind-item" onClick={() => setKind(id)}>
              {title}
            </div>
          ))}
        </div>
        <div
          className="line"
          style={{
            left: `${10 + kind * 60}px`
          }}
        />
      </div>
      <div className="record-content"></div>
      <div className="keyboard"></div>
    </div>
  );
};

export { NewRecord };
