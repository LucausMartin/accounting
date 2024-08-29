import { Outlet } from 'react-router-dom';
import { logout, selectLogin } from '@myStore/slices/login';
// import { fetchData } from '@myUtils/fetchData';
import { useAppDispatch, useAppSelector } from '@myStore/hooks';
import { Login } from '@myPages/login';
import { LOGIN_STATE_ENUM } from '@myConstants/index';
import { Home, BarChart, AccountCircle } from '@mui/icons-material';
import './App.less';

function App() {
  const loginState = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  // const test = async () => {
  //   try {
  //     // await localforage.setItem(
  //     //   'refresh_token',
  //     //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im16eDI2MDI2ODU0MTFAZ21haWwuY29tIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3MjQ4MzExMDYsImV4cCI6MTcyNTQzNTkwNn0.lFrZnM9A-4QhGXaJcrXZhrFi_AWnboklN7xhb6yA2dg'
  //     // );
  //     const res = await fetchData<{ a: string }>('GET', {
  //       url: 'http://localhost:3000/v1/users/test'
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="app">
      <div className="content-container">
        <NavBar />
        <div className="content">
          123
          <Outlet></Outlet>
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

const NavBar = () => {
  return (
    <div className="nav">
      <div className="button-nav">
        <Home />
      </div>
      <div className="button-nav">
        <BarChart />
      </div>
      <div className="button-nav">
        <AccountCircle />
      </div>
    </div>
  );
};

export default App;
