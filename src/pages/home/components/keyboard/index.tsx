import { FC } from 'react';
import { Backspace } from '@mui/icons-material';
import { ReactSetState } from '@myTypes/index';
import './index.less';

/**
 * @description 虚拟键盘
 * @param { ReactSetState<string> } setCostNumber 设置消费金额事件
 * @param { () => void } reset 重置事件
 */
const Keyboard: FC<{
  setCostNumber: ReactSetState<string>;
  reset: () => void;
  addRecord: (again: boolean) => void;
}> = ({ setCostNumber, reset, addRecord }) => {
  /**
   * @description 震动
   */
  const vibrate = () => {
    navigator.vibrate(10);
  };

  /**
   * @description 删除最后一位
   */
  const backspace = () => {
    vibrate();
    setCostNumber(prev => prev.slice(0, -1));
  };

  /**
   * @description 清空
   */
  const clear = () => {
    vibrate();
    reset();
  };

  /**
   * @description 添加金额数字
   * @param  { string } str 字符
   */
  const addCostNumber = (str: string) => {
    vibrate();
    setCostNumber(prev => {
      // 只能有一个小数点
      if (str === '.' && prev.includes('.')) {
        return prev;
      }
      // 小数点后只能有两位
      if (prev.includes('.') && prev.split('.')[1].length >= 2) {
        return prev;
      }
      // 不能以 0 开头
      if (str === '0' && prev === '') {
        return prev;
      }
      // 不能以小数点开头
      if (str === '.' && prev === '') {
        return prev;
      }
      // 没有小数点时，最多8位
      if (!prev.includes('.') && prev.length >= 8) {
        // 如果输入的是小数点，那么可以继续输入
        if (str === '.') {
          return prev + str;
        }
        return prev;
      }
      return prev + str;
    });
  };

  return (
    <div className="keyboard">
      <div className="keyboard-number">
        <div className="keyboard-number-row1">
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('1');
            }}
          >
            1
          </div>
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('2');
            }}
          >
            2
          </div>
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('3');
            }}
          >
            3
          </div>
        </div>
        <div className="keyboard-number-row1">
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('4');
            }}
          >
            4
          </div>
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('5');
            }}
          >
            5
          </div>
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('6');
            }}
          >
            6
          </div>
        </div>
        <div className="keyboard-number-row1">
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('7');
            }}
          >
            7
          </div>
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('8');
            }}
          >
            8
          </div>
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('9');
            }}
          >
            9
          </div>
        </div>
        <div className="keyboard-number-row1">
          <div
            className="keyboard-button"
            style={{
              backgroundColor: 'rgba(148, 148, 148, 0.555)'
            }}
            onClick={() => {
              addRecord(true);
            }}
          >
            再一笔
          </div>
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('0');
            }}
          >
            0
          </div>
          <div
            className="keyboard-button"
            onClick={() => {
              addCostNumber('.');
            }}
          >
            ·
          </div>
        </div>
      </div>
      <div className="keyboard-action">
        <div className="keyboard-action-button" onClick={backspace}>
          <Backspace />
        </div>
        <div className="keyboard-action-button" onClick={clear}>
          清空
        </div>
        <div
          className="keyboard-action-button"
          onClick={() => {
            addRecord(false);
          }}
        >
          确认
        </div>
      </div>
    </div>
  );
};

export { Keyboard };
