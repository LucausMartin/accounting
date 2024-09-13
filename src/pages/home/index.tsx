import { CostCard, NewRecord } from './components/index';
import { NoteAlt, AccountBalanceWallet, Search, AddCircleOutline } from '@mui/icons-material';
import { useState, useCallback, useEffect } from 'react';
import { usePopstateNotLeave } from '@myHooks/usePopstate';
import homeService from './index.service';
import { AccountType } from './types';
import { GetAccountsErrorTypeEnums } from './constants';
import localforage from 'localforage';
import { selectAccount, setAccount } from '@myStore/slices/account';
import { useAppDispatch, useAppSelector } from '@myStore/hooks';
import './index.less';

/**
 * @description 首页
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const accountState = useAppSelector(selectAccount);
  // 是否显示新账单组件
  const [showNewRecord, setShowNewRecord] = useState(false);
  // 是否显示账单选择菜单
  const [showSelectAccount, setShowSelectAccount] = useState(false);
  // 账单列表
  const [accountList, setAccountList] = useState<AccountType[]>([]);

  const getAccountList = async () => {
    const res = await homeService.getAccountList();
    if (!res.success) {
      switch (res.data.error_type) {
        case GetAccountsErrorTypeEnums.FAILED_TO_GET:
          console.error('获取失败');
          break;
        default:
          console.error('请检查网络');
          break;
      }
    } else {
      setAccountList(res.data.accounts);
    }
  };

  useEffect(() => {
    if (accountState) {
      localforage.setItem('account_id', accountState.id);
    } else {
      localforage.getItem<string>('account_id').then(id => {
        console.log(id);
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

  /**
   * @description 返回事件
   */
  const backEvent = useCallback(() => {
    alert('已经是首页');
  }, []);

  const selectAccountItem = (item: AccountType) => {
    dispatch(setAccount(item));
    setShowSelectAccount(false);
  };

  // 非叶子组件通用监听返回逻辑
  usePopstateNotLeave(showNewRecord, backEvent);

  useEffect(() => {
    getAccountList();
  }, []);

  return (
    <div className="home">
      <div className="home-top-bar">
        <div
          className="home-account"
          onClick={() => {
            setShowSelectAccount(true);
          }}
        >
          <AccountBalanceWallet className="icon" />
          {accountState && <div>{accountState.name}</div>}
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
        <Search className="icon" />
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
