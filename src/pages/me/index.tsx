import { logout, selectLogin, ready } from '@myStore/slices/login';
import { useAppDispatch, useAppSelector } from '@myStore/hooks';

/**
 * @description 我的页面
 */
const Me = () => {
  const loginState = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  return (
    <div className="home">
      <h1>Me</h1>
      <div>{loginState}</div>
      <p>This is the Me page.</p>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        logout
      </button>
      <button
        onClick={() => {
          dispatch(ready());
        }}
      >
        ready
      </button>
    </div>
  );
};

export { Me };
