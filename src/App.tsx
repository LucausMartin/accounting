import { Outlet, useNavigate } from 'react-router-dom';
import { logout, selectLogin } from '@myStore/slices/login';
import { useAppDispatch, useAppSelector } from '@myStore/hooks';
import { Login } from '@myPages/login';
import { LOGIN_STATE_ENUM } from '@myConstants/index';
import { Home, BarChart, AccountCircle } from '@mui/icons-material';
import './App.less';
import { useEffect } from 'react';
import { fetchData } from '@myUtils/fetchData';

function App() {
  const loginState = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const test = async () => {
    try {
      // await localforage.setItem(
      //   'refresh_token',
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im16eDI2MDI2ODU0MTFAZ21haWwuY29tIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3MjQ4MzExMDYsImV4cCI6MTcyNTQzNTkwNn0.lFrZnM9A-4QhGXaJcrXZhrFi_AWnboklN7xhb6yA2dg'
      // );
      const res = await fetchData<{ a: string }>('GET', {
        url: 'http://localhost:3000/v1/users/test'
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // 默认转跳到首页
  useEffect(() => {
    navigate('/home');
    test();
    window.opener = window;
  }, []);

  return (
    <div className="app">
      <div className="content-container">
        <NavBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Login
        show={loginState === LOGIN_STATE_ENUM.READY}
        closeEvent={() => {
          dispatch(logout());
        }}
      ></Login>
    </div>
  );
}

/**
 * @description 导航栏
 */
const NavBar = () => {
  const navigate = useNavigate();

  const toPage = (url: string) => {
    navigate(url);
  };
  return (
    <div className="nav">
      <div
        className="button-nav"
        onClick={() => {
          toPage('/home');
        }}
      >
        <Home />
      </div>
      <div
        className="button-nav"
        onClick={() => {
          toPage('/statistics');
        }}
      >
        <BarChart />
      </div>
      <div
        className="button-nav"
        onClick={() => {
          toPage('/me');
        }}
      >
        <AccountCircle />
      </div>
    </div>
  );
};

export default App;
