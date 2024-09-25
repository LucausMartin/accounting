import { CostCard, NewRecord } from './components/index';
import { NoteAlt, AccountBalanceWallet, Search, AddCircleOutline } from '@mui/icons-material';
import { useState, useCallback, useEffect, useRef } from 'react';
import { usePopstateNotLeave } from '@myHooks/usePopstate';
import homeService from './index.service';
import { AccountType } from './types';
import { GetAccountsErrorTypeEnums } from './constants';
import localforage from 'localforage';
import { selectAccount, setAccount } from '@myStore/slices/account';
import { useAppDispatch, useAppSelector } from '@myStore/hooks';
import { LoadingCircle } from '@myComponents/index';
import './index.less';

/**
 * @description 首页
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const accountState = useAppSelector(selectAccount);
  // 是否显示新账本组件
  const [showNewRecord, setShowNewRecord] = useState(false);
  // 是否显示账本选择菜单
  const [showSelectAccount, setShowSelectAccount] = useState(false);
  // 账本列表
  const [accountList, setAccountList] = useState<AccountType[]>([]);
  // 账本 Loading
  const [accountLoading, setAccountLoading] = useState(false);
  // 账本获取是否失败
  const [getAccountError, setGetAccountError] = useState(false);
  // 搜索是否展示
  const [showSearch, setShowSearch] = useState(false);
  // 搜索框
  const homeSearch = useRef<HTMLInputElement>(null);

  /**
   * @description 获取账本列表
   */
  const getAccountList = async () => {
    setAccountLoading(true);
    const res = await homeService.getAccountList();
    if (!res.success) {
      switch (res.data.error_type) {
        case GetAccountsErrorTypeEnums.FAILED_TO_GET:
          dispatch(setAccount(null));
          setAccountList([]);
          break;
        default:
          dispatch(setAccount(null));
          setAccountList([]);
          console.error('请检查网络');
          break;
      }
      setGetAccountError(true);
    } else {
      setAccountList(res.data.accounts);
    }
    setAccountLoading(false);
  };

  /**
   * @description 返回事件
   */
  const backEvent = useCallback(() => {
    alert('已经是首页');
  }, []);

  /**
   * @description 选择账本
   * @param {AccountType} item 账本
   */
  const selectAccountItem = (item: AccountType) => {
    dispatch(setAccount(item));
    setShowSelectAccount(false);
  };

  /**
   * @description 渲染账本名称
   * @returns {JSX.Element} 账本名称或 Loading 或 错误信息
   */
  const renderAccountName = (): JSX.Element => {
    if (accountLoading) {
      return <LoadingCircle color="var(--main-color)" sizeScal={0.7} />;
    } else if (accountState) {
      return <div className="home-account-name">{accountState.name}</div>;
    } else if (getAccountError) {
      return (
        <div className="error" onClick={() => getAccountList()}>
          获取账本失败
        </div>
      );
    }
    return <></>;
  };

  const clickSearchIconEvent = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      homeSearch.current?.blur();
    } else {
      setTimeout(() => {
        homeSearch.current?.focus();
      }, 300);
    }
  };

  // 非叶子组件通用监听返回逻辑
  usePopstateNotLeave(showNewRecord, backEvent);

  // 缓存、取出账本逻辑
  useEffect(() => {
    if (accountState) {
      localforage.setItem('account_id', accountState.id);
    } else {
      localforage.getItem<string>('account_id').then(id => {
        if (id) {
          const account = accountList.find(item => item.id === id);
          if (account) {
            dispatch(setAccount(account));
          } else {
            dispatch(setAccount(accountList[0]));
          }
        } else {
          dispatch(setAccount(accountList[0]));
        }
      });
    }
  }, [accountState, accountList]);

  useEffect(() => {
    getAccountList();
  }, []);

  return (
    <div className="home">
      <div className="home-top-bar">
        <div
          className="home-account"
          style={{
            opacity: showSearch ? 0 : 1
          }}
          onClick={
            getAccountError
              ? () => {}
              : () => {
                  setShowSelectAccount(true);
                }
          }
        >
          <AccountBalanceWallet className="icon" />
          {renderAccountName()}
          {showSelectAccount && (
            <div
              className="home-account-mask"
              onClick={e => {
                e.stopPropagation();
                setShowSelectAccount(false);
              }}
            >
              <div
                className="home-select-account"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <div className="home-account-item">
                  <AddCircleOutline className="icon home-account-icon" />
                  新增账本
                </div>
                {accountList.map((item, index) => (
                  <div key={index} className="home-account-item" onClick={() => selectAccountItem(item)}>
                    <AccountBalanceWallet className="icon home-account-icon" />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className="home-search"
          style={{
            left: showSearch ? '0px' : 'calc(100% - 30px)'
          }}
          onClick={clickSearchIconEvent}
        >
          <Search className="icon" />
        </div>
      </div>
      <div
        style={{
          right: showSearch ? '0px' : '-100%'
        }}
        className="home-search-input"
      >
        <input
          className="home-search-input-entity"
          ref={homeSearch}
          onBlur={() => {
            setShowSearch(false);
          }}
          placeholder="搜索标题、备注、时间"
          type="text"
        />
      </div>
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
