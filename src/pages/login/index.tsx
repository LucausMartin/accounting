import { PopUp, Link } from '@myComponents/index';
import { StateTypes } from './types';
import { TextField, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import loginService from './index.service';
import './index.less';

export const Login: FC<{ closeEvent: () => void; show: boolean }> = ({ closeEvent, show }) => {
  const [sendButText, setSendButText] = useState<'Send' | number>('Send');
  const [state, setState] = useState<StateTypes.LOGIN | StateTypes.REGISTER>(StateTypes.LOGIN);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  /**
   * @description 发送验证码事件
   */
  const sendVerificationCode = async () => {
    const res = await loginService.sendVerificationCode(email, state === StateTypes.LOGIN);
    console.log(res);
    setSendButText(30);
  };

  /**
   * @description 切换到注册页面事件
   */
  const switchState = () => {
    console.log(state);
    if (state === StateTypes.REGISTER) {
      setState(StateTypes.LOGIN);
      return;
    }
    setState(StateTypes.REGISTER);
  };

  /**
   * @description 关闭登录弹窗事件
   */
  const closeLogin = () => {
    closeEvent();
  };

  /**
   * @description 提交表单事件
   */
  const submit = () => {
    if (state === StateTypes.LOGIN) {
      login();
      return;
    } else {
      register();
    }
  };

  const register = async () => {
    const res = await loginService.register(email, code);
    console.log(res);
  };

  const login = async () => {
    const res = await loginService.login(email, code);
    console.log(res);
  };

  useEffect(() => {
    if (sendButText === 'Send') {
      return;
    }
    if (sendButText === 0) {
      setSendButText('Send');
      return;
    }
    const timer = setTimeout(() => {
      setSendButText(pre => {
        return (pre as number) - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [sendButText]);

  useEffect(() => {
    setTimeout(() => {
      setState(StateTypes.LOGIN);
    }, 500);
  }, [show]);

  return (
    <PopUp closeEvent={closeEvent} show={show}>
      <div
        className="login-container"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <span className="title">{state === StateTypes.LOGIN ? 'Login' : 'Register'}</span>
        <Close className="close" onClick={closeLogin}></Close>
        <TextField
          className="text-field"
          label="Email"
          variant="standard"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <div className="text-field">
          <TextField
            className="text-field-verification"
            label="Verification Code"
            variant="standard"
            value={code}
            onChange={e => {
              setCode(e.target.value);
            }}
          />
          <Button
            className="send-code"
            variant="outlined"
            disabled={sendButText !== 'Send' && sendButText !== 0}
            onClick={sendVerificationCode}
          >
            {sendButText}
          </Button>
        </div>
        <div className="register" onClick={switchState}>
          <Link text={state === StateTypes.LOGIN ? 'Register' : 'Login'} />
        </div>
        <div className="submit">
          <Button variant="contained" onClick={submit}>
            Let's go
          </Button>
        </div>
      </div>
    </PopUp>
  );
};
