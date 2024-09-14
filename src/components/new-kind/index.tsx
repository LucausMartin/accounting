import { Close, Check } from '@mui/icons-material';
import { NEW_KIND_TYPE_ENUM, SERVER_IMG_URL } from '@myConstants/index';
import { FC, useCallback, useEffect, useState } from 'react';
import newKindService from './index.service';
import { SystemIconType, UserIconType } from './types';
import {
  UploadIconErrorTypeEnums,
  CreateKindsParentErrorTypeEnums,
  GetAllIconsByUserErrorTypeEnums,
  CreateKindChildErrorTypeEnums
} from './constants';
import { usePopstateLeave } from '@myHooks/usePopstate';
import { Loading } from '@myComponents/loading';
import './index.less';

/**
 * @description 新种类组件
 * @param type 种类类型
 * @param { () => void } close 关闭事件
 * @param { boolean } show 是否显示
 * @param { string } parentId 父类id
 */
export const NewKind: FC<{
  parentId: string;
  type: {
    id: number;
    type: NEW_KIND_TYPE_ENUM;
    title: string;
    parents: boolean;
  };
  close: () => void;
  show: boolean;
}> = ({ type, close, show, parentId }) => {
  // 自定义图标路径
  const [imgSrc, setImgSrc] = useState<string>('');
  // 系统图标 SVG 对象
  const [systemSvgCode, setSvgCode] = useState<SystemIconType>({
    id: '',
    name: '',
    SVGCode: ''
  });
  // 类别名称
  const [kindName, setKindName] = useState('');
  // 系统图标数组
  const [systemIcons, setSystemIcons] = useState<SystemIconType[]>([]);
  // 用户上传过的图标
  const [userIcons, setUserIcons] = useState<UserIconType[]>([]);
  // check loading
  const [checkLoading, setCheckLoading] = useState(false);

  // 返回事件
  const backEvent = useCallback(() => {
    init();
    close();
  }, []);

  // 叶子组件通用监听返回逻辑
  usePopstateLeave(backEvent);

  /**
   * @description 初始化状态
   */
  const init = () => {
    setImgSrc('');
    setSvgCode({
      id: '',
      name: '',
      SVGCode: ''
    });
    setKindName('');
  };

  /**
   * @description 选择 SVG 文件上传
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
          setSvgCode({
            id: '',
            name: '',
            SVGCode: ''
          });
          setImgSrc(res.data.path);
          getUserIcons();
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

  /**
   * @description 选择系统图标
   * @param { SystemIconType } icon 系统图标
   */
  const selectSystemIcon = (icon: SystemIconType) => {
    setImgSrc('');
    setSvgCode(icon);
  };

  /**
   * @description 获取用户上传过的图标
   */
  const getUserIcons = async () => {
    const res = await newKindService.getAllIconsbyUser();
    if (!res.success) {
      // TODO: 错误处理
      switch (res.data.error_type) {
        case GetAllIconsByUserErrorTypeEnums.FAILED_TO_GET:
          console.error('获取失败');
          break;
        default:
          console.error('请检查网络');
          break;
      }
    } else {
      setUserIcons(res.data.icons);
    }
  };

  /**
   * @description 选择用户上传过的图标
   * @param { UserIconType } icon 用户图标
   */
  const selectUserIcon = (icon: UserIconType) => {
    setImgSrc(icon.name);
    setSvgCode({
      id: '',
      name: '',
      SVGCode: ''
    });
  };

  const createParentsKind = async () => {
    setCheckLoading(true);
    // imgSrc 去掉 /static/ 字符
    const fileName = imgSrc.split('/static/')[1];
    const res = await newKindService.createKindsParent(
      kindName,
      fileName,
      systemSvgCode.id,
      type.type === NEW_KIND_TYPE_ENUM.EXPENSES ? 0 : 1
    );
    if (!res.success) {
      switch (res.data.error_type) {
        case CreateKindsParentErrorTypeEnums.FAILED_TO_CREATE:
          console.error('获取失败');
          break;
        default:
          console.error('请检查网络');
          break;
      }
    } else {
      console.log('创建成功');
      backEvent();
    }
    setCheckLoading(false);
  };

  const createChildKind = async () => {
    setCheckLoading(true);
    // imgSrc 去掉 /static/ 字符
    const fileName = imgSrc.split('/static/')[1];
    const res = await newKindService.createKindsChild(kindName, fileName, systemSvgCode.id, parentId);
    if (!res.success) {
      switch (res.data.error_type) {
        case CreateKindChildErrorTypeEnums.FAILED_TO_CREATE:
          console.error('获取失败');
          break;
        default:
          console.error('请检查网络');
          break;
      }
    } else {
      console.log('创建成功');
      backEvent();
    }
    setCheckLoading(false);
  };

  const createKind = async () => {
    if (kindName === '') {
      console.log('请输入名称');
      return;
    }
    if (imgSrc === '' && systemSvgCode.SVGCode === '') {
      console.log('请选择图标');
      return;
    }
    if (type.parents) {
      createParentsKind();
    } else {
      createChildKind();
    }
  };

  const reanderCheck = () => {
    if (checkLoading) {
      return <Loading className="check" sizeScal={0.8} />;
    } else {
      return <Check className="check" onClick={createKind} />;
    }
  };

  // 获取系统图标
  useEffect(() => {
    getSystemIcons();
    getUserIcons();
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
      <Close className="close" onClick={backEvent} />
      {reanderCheck()}

      <div className="new-kind-title">{'添加' + type.title + '类别'}</div>
      <div className="new-kind-info">
        <div className="new-kind-info-container">
          <div className="new-kind-info-name">
            <span>{type.parents ? '大类名称' : '子类名称'}</span>
            <input type="text" placeholder="输入名称" value={kindName} onChange={e => setKindName(e.target.value)} />
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
          {systemSvgCode.SVGCode === '' ? (
            <div className="new-kind-info-kind-icon">
              {imgSrc !== '' && <img src={SERVER_IMG_URL + imgSrc} alt="" />}
            </div>
          ) : (
            <div className="new-kind-info-kind-icon" dangerouslySetInnerHTML={{ __html: systemSvgCode.SVGCode }}></div>
          )}
        </div>
      </div>
      <div className="new-kind-icons">
        {userIcons.length > 0 && (
          <div className="new-kind-user-icons">
            <div className="new-kind-user-icons-title">最近上传图标</div>
            {
              // 每六个是一行
              Array.from({ length: Math.ceil(userIcons.length / 6) }).map((_, index) => (
                <div className="new-kind-user-icons-row" key={index}>
                  {userIcons.slice(index * 6, (index + 1) * 6).map(icon => (
                    <div key={icon.id}>
                      <div className="new-kind-user-icon" onClick={() => selectUserIcon(icon)}>
                        <img src={SERVER_IMG_URL + icon.name} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        )}
        <div className="new-kind-system-icons">
          <div className="new-kind-system-icons-title">系统图标</div>
          {
            // 每六个是一行
            Array.from({ length: Math.ceil(systemIcons.length / 6) }).map((_, index) => (
              <div className="new-kind-system-icons-row" key={index}>
                {systemIcons.slice(index * 6, (index + 1) * 6).map(icon => (
                  <div key={icon.id} onClick={() => selectSystemIcon(icon)}>
                    <div className="new-kind-system-icon" dangerouslySetInnerHTML={{ __html: icon.SVGCode }} />
                    <div className="new-kind-system-icon-name">
                      <span className="new-kind-system-icon-name-text">{icon.name.split('-')[1]}</span>
                    </div>
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
