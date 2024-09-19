import { Close, CalendarMonth } from '@mui/icons-material';
import { FC, useCallback, useEffect, useState } from 'react';
import { formatNumberToString } from '@myUtils/index';
import dayjs, { Dayjs } from 'dayjs';
import { KINDLIST, GetKindsParentsByEmailErrorTypeEnums, AddAccountItemErrorTypeEnums } from './constants';
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
import { KindParentType, KindChildType, AccountAddItemParamsType } from './types';
import { selectAccount } from '@myStore/slices/account';
import AddIcon from '@myAssets/add.svg';
import { useAppSelector } from '@myStore/hooks';
import './index.less';

/**
 * @description 新账单组件
 * @param { () => void } close 关闭事件
 * @param { boolean } show 是否显示
 */
const NewRecord: FC<{ close: () => void; show: boolean }> = ({ close, show }) => {
  const accountState = useAppSelector(selectAccount);
  // 页面类型
  const [kind, setKind] = useState(KINDLIST[0]);
  // 消费金额
  const [costNumber, setCostNumber] = useState('');
  // 该账单时间
  const [time, setTime] = useState<Dayjs>(dayjs());
  // 子类
  const [child, setChild] = useState<KindChildType | null>(null);
  // 是否显示日历
  const [showCalendar, setShowCalendar] = useState(false);
  // 是否显示添加种类页面
  const [addKindShow, setAddKindShow] = useState(false);
  // 父类
  const [parent, setParent] = useState<KindParentType | null>(null);
  // 是否显示子类面板
  const [showChildPanel, setShowChildPanel] = useState(false);
  // 子类数组
  const [childList, setChildList] = useState<KindChildType[]>([]);
  // 备注
  const [remark, setRemark] = useState<string>('');

  /**
   * @description 返回事件
   */
  const backEvent = useCallback(() => {
    setParent(null);
    setChildList([]);
    setShowChildPanel(false);
    setAddKindShow(false);
    setShowCalendar(false);
    setChildList([]);
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
    setCostNumber('');
    setTime(dayjs());
    setShowCalendar(false);
    setParent(null);
    setChild(null);
    setRemark('');
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

  /**
   * @description 关闭子类面板
   */
  const closeChildPanel = () => {
    setShowChildPanel(false);
  };

  /**
   * @description 打开子类面板
   * @param { KindParentType } item 父类
   */
  const openChildPanel = (item: KindParentType) => {
    setParent(item);
    setChildList(item.children);
    setShowChildPanel(true);
  };

  /**
   * @description 选择种类
   * @param { KindChildType } kind 种类
   */
  const selectKind = (kind: KindChildType) => {
    setChild(kind);
  };

  const addRecordFetch = async (params: AccountAddItemParamsType) => {
    const res = await newRecordService.addNewRecord(params);
    if (!res.success) {
      switch (res.data.error_type) {
        case AddAccountItemErrorTypeEnums.FAILED_TO_ADD:
          console.error('添加失败');
          break;
        default:
          console.error('请检查网络');
      }
      return false;
    } else {
      return true;
    }
  };

  const addRecord = async (again: boolean) => {
    // TODO: 错误提示
    if (!child) {
      return;
    }
    if (!parent) {
      return;
    }
    if (!accountState) {
      return;
    }
    const params: AccountAddItemParamsType = {
      parent_kind_id: parent.id,
      child_kind_id: child.id,
      account_id: accountState.id,
      remark: remark,
      cost: formatNumberToString(kind.type !== NEW_KIND_TYPE_ENUM.EXPENSES ? costNumber : '-' + costNumber),
      type: kind.type === NEW_KIND_TYPE_ENUM.INCOME ? 1 : 0,
      time: time.format('YYYY-MM-DD HH:mm:ss')
    };
    const res = await addRecordFetch(params);
    if (res) {
      initStates();
    }
    if (!again && res) {
      backEvent();
    }
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
      <NewKind type={kind} close={closeAddKind} show={addKindShow} parentId={parent ? parent.id : ''} />
      <KindChildPanel
        selectKind={selectKind}
        childList={childList}
        show={showChildPanel}
        closeEvent={closeChildPanel}
        showNewKind={showNewKind}
      />
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
          <KindPanel
            showNewKind={showNewKind}
            addKindShow={addKindShow}
            type={NEW_KIND_TYPE_ENUM.EXPENSES}
            openChildPanel={openChildPanel}
          />
          <KindPanel
            showNewKind={showNewKind}
            addKindShow={addKindShow}
            type={NEW_KIND_TYPE_ENUM.INCOME}
            openChildPanel={openChildPanel}
          />
        </MovePanel>
      </div>
      <div className="record-cost-info">
        <div className="record-cost-info-icon">
          {child && child.fileName ? (
            <img className="record-cost-info-icon-pic" src={SERVER_IMG_URL + child.fileName} alt="" />
          ) : (
            <></>
          )}
          {child && child.svgCodeId ? (
            <div className="record-cost-info-icon-pic" dangerouslySetInnerHTML={{ __html: child.svgCodeId?.SVGCode }} />
          ) : (
            <></>
          )}
        </div>
        {`${child && parent ? parent.name + ' > ' : ''}${child ? child.name + ' / ' : ''}${time.format('YYYY-MM-DD')} / ${kind.title}`}
      </div>
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
        <input
          className="record-remark"
          placeholder="添加备注"
          value={remark}
          onChange={e => {
            setRemark(e.target.value);
          }}
        />
        <div className="record-cost">
          <CostNumber
            cost={formatNumberToString(kind.type !== NEW_KIND_TYPE_ENUM.EXPENSES ? costNumber : '-' + costNumber)}
            className="record-cost-number"
            initType={kind.type}
          />
        </div>
      </div>
      <Keyboard setCostNumber={setCostNumber} reset={initStates} addRecord={addRecord} />
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
 * @param { (item: KindParentType) => void } openChildPanel 打开子类面板
 * @param { NEW_KIND_TYPE_ENUM } type 种类类型
 */
const KindPanel: FC<{
  showNewKind: (parent: boolean) => void;
  type: NEW_KIND_TYPE_ENUM;
  addKindShow: boolean;
  openChildPanel: (item: KindParentType) => void;
}> = ({ showNewKind, type, openChildPanel, addKindShow }) => {
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
    if (addKindShow) {
      return;
    }
    if (type === NEW_KIND_TYPE_ENUM.EXPENSES) {
      getExpensesKindParents();
    } else if (type === NEW_KIND_TYPE_ENUM.INCOME) {
      getIncomeKindParents();
    }
  }, [addKindShow]);

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
                onClick={kind.id === 'default' ? clickAddEvent : () => openChildPanel(kind)}
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

/**
 * @description 子类面板
 * @param { KindChildType[] } childList 子类数组
 * @param { boolean } show 是否显示
 * @param { () => void } closeEvent 关闭事件
 * @param { (parent: boolean) => void } showNewKind 显示添加种类
 * @param { (kind: KindChildType) => void } selectKind 选择种类
 */
const KindChildPanel: FC<{
  childList: KindChildType[];
  show: boolean;
  closeEvent: () => void;
  showNewKind: (parent: boolean) => void;
  selectKind: (kind: KindChildType) => void;
}> = ({ show, closeEvent, showNewKind, childList, selectKind }) => {
  const addItem: KindChildType = {
    id: 'default',
    name: '添加',
    fileName: AddIcon,
    svgCodeId: null
  };
  const [list, setList] = useState<KindChildType[]>([]);

  const clickEvent = () => {
    showNewKind(false);
    closeEvent();
  };

  const select = (kind: KindChildType) => {
    selectKind(kind);
    closeEvent();
  };

  useEffect(() => {
    setList([...childList, addItem]);
  }, [childList]);

  return (
    <PopUp show={show} closeEvent={closeEvent}>
      <div className="record-child-panel">
        <Close className="close" onClick={closeEvent} />
        <div className="record-child-list">
          {Array.from({ length: Math.ceil(list.length / 5) }).map((_, index) => (
            <div key={index} className="record-child-row">
              {list.slice(index * 5, (index + 1) * 5).map(kind => (
                <div
                  key={kind.id}
                  className="record-child-item"
                  onClick={kind.id === 'default' ? clickEvent : () => select(kind)}
                >
                  <div>
                    {kind.fileName && (
                      <img
                        className="record-child-item-pic"
                        src={kind.fileName.includes('/static/') ? SERVER_IMG_URL + kind.fileName : kind.fileName}
                        alt=""
                      />
                    )}
                    {kind.svgCodeId && (
                      <div
                        className="record-child-item-pic"
                        dangerouslySetInnerHTML={{ __html: kind.svgCodeId.SVGCode }}
                      />
                    )}
                  </div>
                  <div className="record-child-item-name">
                    <span className="record-child-item-name-text">{kind.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PopUp>
  );
};

export { NewRecord };
