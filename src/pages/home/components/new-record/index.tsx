import { Close, CalendarMonth } from '@mui/icons-material';
import { FC, useCallback, useEffect, useState } from 'react';
import { formatNumberToString } from '@myUtils/index';
import dayjs, { Dayjs } from 'dayjs';
import { KINDLIST, GetKindsParentsByEmailErrorTypeEnums } from './constants';
import { Keyboard, CostNumber } from '../index';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PopUp } from '@myComponents/pop-up';
import { ReactSetState } from '@myTypes/index';
import { NewKind, MovePanel } from '@myComponents/index';
import { usePopstateNotLeave } from '@myHooks/usePopstate';
import newRecordService from './index.service';
import { NEW_KIND_TYPE_ENUM, SERVER_IMG_URL } from '@myConstants/index';
import { KindParentType } from './types';
import AddIcon from '@myAssets/add.svg';
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
   * @description 移动面板
   * @param { number } index 移动到的索引
   */
  const movePanel = (index: number) => {
    setKind(KINDLIST[index]);
  };

  /**
   * @description 显示添加种类
   * @param { boolean } parent 是否是父类
   */
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
          <KindPanel showNewKind={showNewKind} type={NEW_KIND_TYPE_ENUM.EXPENSES} />
          <KindPanel showNewKind={showNewKind} type={NEW_KIND_TYPE_ENUM.INCOME} />
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

/**
 * @description 种类面板
 * @param { (parent: boolean) => void } showNewKind 显示添加种类
 * @param { NEW_KIND_TYPE_ENUM } type 种类类型
 */
const KindPanel: FC<{
  showNewKind: (parent: boolean) => void;
  type: NEW_KIND_TYPE_ENUM;
}> = ({ showNewKind, type }) => {
  const addItem: KindParentType = {
    id: 'default',
    name: '添加',
    fileName: AddIcon,
    svgCodeId: null,
    children: []
  };
  const [kindList, setKindList] = useState<KindParentType[]>([]);
  /**
   * @description 获取支出种类父级
   */
  const getExpensesKindParents = async () => {
    const res = await newRecordService.getExpensesKindParents();
    if (!res.success) {
      // TODO: 错误处理
      switch (res.data.error_type) {
        case GetKindsParentsByEmailErrorTypeEnums.FAILED_TO_GET:
          console.error('获取失败');
          break;
        default:
          console.error('请检查网络');
      }
    } else {
      setKindList([...res.data.kinds_parents, addItem]);
    }
  };

  /**
   * @description 获取收入种类父级
   */
  const getIncomeKindParents = async () => {
    const res = await newRecordService.getIncomeKindParents();
    if (!res.success) {
      // TODO: 错误处理
      switch (res.data.error_type) {
        case GetKindsParentsByEmailErrorTypeEnums.FAILED_TO_GET:
          console.error('获取失败');
          break;
        default:
          console.error('请检查网络');
      }
    } else {
      setKindList([...res.data.kinds_parents, addItem]);
    }
  };

  const clickAddEvent = () => {
    showNewKind(true);
  };

  useEffect(() => {
    if (type === NEW_KIND_TYPE_ENUM.EXPENSES) {
      getExpensesKindParents();
    } else if (type === NEW_KIND_TYPE_ENUM.INCOME) {
      getIncomeKindParents();
    }
  }, []);

  return (
    <div className="record-content-card">
      {
        // 六个一行
        Array.from({ length: Math.ceil(kindList.length / 6) }).map((_, index) => (
          <div key={index} className="record-content-card-row">
            {kindList.slice(index * 6, (index + 1) * 6).map(kind => (
              <div
                key={kind.id}
                className="record-content-card-item"
                onClick={kind.id === 'default' ? clickAddEvent : () => {}}
              >
                <div>
                  {kind.fileName && (
                    <img
                      className="record-content-card-item-pic"
                      src={kind.fileName.includes('/static/') ? SERVER_IMG_URL + kind.fileName : kind.fileName}
                      alt=""
                    />
                  )}
                  {kind.svgCodeId && (
                    <div
                      className="record-content-card-item-pic"
                      dangerouslySetInnerHTML={{ __html: kind.svgCodeId.SVGCode }}
                    />
                  )}
                </div>
                <div className="record-content-card-item-name">
                  <span className="record-content-card-item-name-text">{kind.name}</span>
                </div>
              </div>
            ))}
          </div>
        ))
      }
    </div>
  );
};

export { NewRecord };
