import { Outlet } from 'react-router-dom';
import { increment, decrement, selectCount } from '@myStore/slices/count';
import { useAppDispatch, useAppSelector } from '@myStore/hooks';
import './App.less';
import { Login } from '@myPages/login';
import { useState } from 'react';

function App() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [loginShow, setLoginShow] = useState(false);

  const loginPopUpClose = () => {
    setLoginShow(false);
  };
  return (
    <div>
      <h1>APP</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button
        onClick={() => {
          setLoginShow(!loginShow);
        }}
      >
        login
      </button>
      <Outlet></Outlet>
      <Login show={loginShow} closeEvent={loginPopUpClose}></Login>
    </div>
  );
}

export default App;
