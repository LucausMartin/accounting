import './index.less';
import { Close, Check } from '@mui/icons-material';
import { NEW_KIND_TYPE_ENUM } from '@myConstants/index';
import { FC } from 'react';
import { fetchData } from '@myUtils/fetchData';

/**
 * @description 新种类组件
 * @param type 种类类型
 * @param {() => void} close 关闭事件
 * @param {boolean} show 是否显示
 */
export const NewKind: FC<{
  type: {
    id: number;
    type: NEW_KIND_TYPE_ENUM;
    title: string;
    parents: boolean;
  };
  close: () => void;
  show: boolean;
}> = ({ type, close, show }) => {
  /**
   * @description 选择 SVG 文件
   */
  const selectSVG = async () => {
    console.log('selectSVG');
    const formData = new FormData();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.svg';
    input.onchange = async () => {
      if (input.files) {
        formData.append('file', input.files[0]);
        const res = await fetchData(
          'POST',
          {
            url: '//localhost:3000/v1/upload',
            headers: {
              'Content-Type': ''
            }
          },
          formData
        );
        console.log(res);
      }
    };
    input.click();
  };
  return (
    <div
      className="new-kind"
      style={{
        top: show ? '0' : '100%',
        zIndex: show ? '1' : '-1',
        opacity: show ? '1' : '0'
      }}
    >
      <Close className="close" onClick={close} />
      <Check className="check" onClick={close} />

      <div className="new-kind-title">{'添加' + type.title + '类别'}</div>
      <div className="new-kind-info">
        <div className="new-kind-info-container">
          <div className="new-kind-info-name">
            <span>{type.parents ? '大类名称' : '子类名称'}</span>
            <input type="text" placeholder="输入名称" />
          </div>
          <div className="new-kind-info-desc">&nbsp;123</div>
        </div>
        <div className="new-kind-info-curosr-container" onClick={selectSVG}>
          <div className="new-kind-info-kind-text">
            <div className="new-kind-info-kind">
              <span>分类图标</span>
            </div>
            <div className="new-kind-info-desc">点击可自定义图标</div>
          </div>
          <div className="new-kind-info-kind-icon">
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div className="new-kind-icons">123</div>
    </div>
  );
};
