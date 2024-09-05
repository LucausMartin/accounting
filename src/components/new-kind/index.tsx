import { Close, Check } from '@mui/icons-material';
import { NEW_KIND_TYPE_ENUM, SERVER_IMG_URL } from '@myConstants/index';
import { FC, useCallback, useEffect, useState } from 'react';
import newKindService from './index.service';
import { SystemIconType } from './types';
import { UploadIconErrorTypeEnums, CreateKindsParentErrorTypeEnums } from './constants';
import { usePopstateLeave } from '@myHooks/usePopstate';
import './index.less';

/**
 * @description 新种类组件
 * @param type 种类类型
 * @param { () => void } close 关闭事件
 * @param { boolean } show 是否显示
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
  // 自定义图标路径
  const [imgSrc, setImgSrc] = useState<string>('');

  // 系统图标数组
  const [systemIcons, setSystemIcons] = useState<SystemIconType[]>([]);

  // 返回事件
  const backEvent = useCallback(() => {
    close();
  }, []);

  // 叶子组件通用监听返回逻辑
  usePopstateLeave(backEvent);

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
        // 7MB 限制
        if (input.files[0].size > 7 * 1024 * 1024) {
          // TODO: 错误处理
          console.log('文件过大');
          return;
        }
        formData.append('file', input.files[0]);
        const res = await newKindService.uploadSVG(formData);
        console.log(res);
        if (!res.success) {
          // TODO: 错误处理
          switch (res.data.error_type) {
            case UploadIconErrorTypeEnums.FAILED_TO_CREATE:
              console.error('上传失败');
              break;
            default:
              console.error('请检查网络');
              break;
          }
        } else {
          setImgSrc(res.data.path);
        }
      }
    };
    input.click();
  };

  /**
   * @description 获取系统图标
   */
  const getSystemIcons = async () => {
    const res = await newKindService.getAllSystemIcons();
    console.log(res);
    if (!res.success) {
      // TODO: 错误处理
      switch (res.data.error_type) {
        case CreateKindsParentErrorTypeEnums.FAILED_TO_CREATE:
          console.error('获取失败');
          break;
        default:
          console.error('请检查网络');
          break;
      }
    } else {
      setSystemIcons(res.data.svg_code);
    }
  };

  // 获取系统图标
  useEffect(() => {
    getSystemIcons();
  }, []);

  return (
    <div
      className="new-kind"
      style={{
        top: show ? '0' : '100dvh',
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
          <div className="new-kind-info-desc">&nbsp;</div>
        </div>
        <div className="new-kind-info-curosr-container" onClick={selectSVG}>
          <div className="new-kind-info-kind-text">
            <div className="new-kind-info-kind">
              <span>分类图标</span>
            </div>
            <div className="new-kind-info-desc">点击可自定义图标</div>
          </div>
          <div className="new-kind-info-kind-icon">{imgSrc !== '' && <img src={SERVER_IMG_URL + imgSrc} alt="" />}</div>
        </div>
      </div>
      <div className="new-kind-icons">
        <div className="new-kind-user-icons"></div>
        <div className="new-kind-system-icons">
          <div className="new-kind-system-icons-title">系统图标</div>
          {
            // 每六个是一行
            Array.from({ length: Math.ceil(systemIcons.length / 6) }).map((_, index) => (
              <div className="new-kind-system-icons-row" key={index}>
                {systemIcons.slice(index * 6, (index + 1) * 6).map(icon => (
                  <div key={icon.id}>
                    <div className="new-kind-system-icon" dangerouslySetInnerHTML={{ __html: icon.SVGCode }} />
                    <div className="new-kind-system-icon-name">{icon.name.split('-')[0]}</div>
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
