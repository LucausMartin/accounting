import { Close, CalendarMonth } from '@mui/icons-material';
import { FC, useCallback, useEffect, useState } from 'react';
import { formatNumberToString } from '@myUtils/index';
import dayjs, { Dayjs } from 'dayjs';
import { KINDLIST } from './constants';
import { Keyboard, CostNumber } from '../index';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PopUp } from '@myComponents/pop-up';
import { ReactSetState } from '@myTypes/index';
import { NewKind, MovePanel } from '@myComponents/index';
import { usePopstateNotLeave } from '@myHooks/usePopstate';
import newRecordService from './index.service';
import './index.less';

/**
 * @description 新账单组件
 * @param { () => void } close 关闭事件
 * @param { boolean } show 是否显示
 */
const NewRecord: FC<{ close: () => void; show: boolean }> = ({ close, show }) => {
  // 页面类型
  const [kind, setKind] = useState(KINDLIST[0]);
  // 消费金额
  const [costNumber, setCostNumber] = useState('');
  // 该账单时间
  const [time, setTime] = useState<Dayjs>(dayjs());
  // 是否显示日历
  const [showCalendar, setShowCalendar] = useState(false);
  // 是否显示添加种类页面
  const [addKindShow, setAddKindShow] = useState(false);
  // 父类id
  const [parentId, setParentId] = useState('e3e392d8-03d0-4d32-abb0-16a93f738d5f');

  /**
   * @description 返回事件
   */
  const backEvent = useCallback(() => {
    setParentId('');
    close();
  }, []);

  // 非叶子组件通用监听返回逻辑
  usePopstateNotLeave(addKindShow, backEvent);

  /**
   * @description 关闭日历
   */
  const closeCalendar = () => {
    console.log('closeCalendar');
    setShowCalendar(false);
  };

  /**
   * @description 关闭添加种类
   */
  const closeAddKind = () => {
    setAddKindShow(false);
  };

  /**
   * @description 初始化状态
   */
  const initStates = () => {
    setKind(KINDLIST[0]);
    setCostNumber('');
    setTime(dayjs());
    setShowCalendar(false);
  };

  /**
   * @description 发送添加种类测试
   */
  // const sendKindTest = () => {
  //   const res = fetchData<{ test: string }, { name: string }>(
  //     'POST',
  //     {
  //       url: '//localhost:3000/v1/kinds-parents/create-kinds-parent',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     },
  //     {
  //       name: 'test'
  //     }
  //   );
  //   console.log(res);
  // };

  const movePanel = (index: number) => {
    setKind(KINDLIST[index]);
  };

  const showNewKind = (parent: boolean) => {
    if (parent) {
      const newKind = {
        ...kind,
        parents: true
      };
      setKind(newKind);
    } else {
      const newKind = {
        ...kind,
        parents: false
      };
      setKind(newKind);
    }
    setAddKindShow(true);
  };

  return (
    <div
      className="home-new-record"
      style={{
        top: show ? '0' : '100dvh',
        zIndex: show ? '1' : '-2',
        opacity: show ? '1' : '0'
      }}
    >
      <NewKind type={kind} close={closeAddKind} show={addKindShow} parentId={parentId} />
      <Close className="close" onClick={close} />
      <div
        style={{
          padding: '10px'
        }}
      >
        <div className="kind">
          {KINDLIST.map(item => (
            <div key={item.id} className="kind-item" onClick={() => setKind(item)}>
              {item.title}
            </div>
          ))}
        </div>
        <div
          className="line"
          style={{
            left: `${10 + kind.id * 60}px`
          }}
        />
      </div>
      <div className="record-content">
        <MovePanel gap={20} actionDistance={40} moveCallback={movePanel} currentIndex={kind.id}>
          <KindPanel showNewKind={showNewKind} />
          <KindPanel showNewKind={showNewKind} />
        </MovePanel>
      </div>
      <div className="record-cost-info">{`${time.format('YYYY-MM-DD')} / ${kind.title}`}</div>
      <div className="record-action">
        <CalendarMonth
          onClick={() => {
            setShowCalendar(true);
          }}
          style={{
            position: 'relative',
            top: '-1px'
          }}
        />
        <input className="record-remark" placeholder="添加备注" />
        <div className="record-cost">
          <CostNumber
            cost={formatNumberToString(kind.title !== '支出' ? costNumber : '-' + costNumber)}
            className="record-cost-number"
          />
        </div>
      </div>
      <Keyboard setCostNumber={setCostNumber} reset={initStates} />
      <PopUp show={showCalendar} closeEvent={closeCalendar}>
        <Calendar time={time} setTime={setTime} closeEvent={closeCalendar} />
      </PopUp>
    </div>
  );
};

/**
 * @description 日历组件
 * @param {Dayjs} time 当前时间
 * @param {ReactSetState<Dayjs>} setTime 设置时间事件
 * @param {() => void} closeEvent 关闭事件
 */
const Calendar: FC<{ time: Dayjs; setTime: ReactSetState<Dayjs>; closeEvent: () => void }> = ({
  time,
  closeEvent,
  setTime
}) => {
  return (
    <div className="calendar">
      <Close className="close" onClick={closeEvent} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={time}
          onChange={(newTime: Dayjs, selectionState) => {
            // 如果选的是日期就关闭，如果是年份就不关闭
            if (selectionState === 'partial') {
              setTime(newTime);
            } else {
              setTime(newTime);
              closeEvent();
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

const KindPanel: FC<{ showNewKind: (parent: boolean) => void }> = ({ showNewKind }) => {
  const getKindParents = async () => {
    const res = await newRecordService.getKindParents();
    console.log(res);
  };

  useEffect(() => {
    getKindParents();
  }, []);
  return (
    <div className="record-content-card">
      <button onClick={() => showNewKind(true)}>show P</button>
      <button onClick={() => showNewKind(false)}>show S</button>
    </div>
  );
};

export { NewRecord };
