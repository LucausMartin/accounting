/**
 * @description 上传图标请求响应参数类型
 */
export interface UploadResType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

/**
 * @description 系统图标类型
 */
export interface SystemIconType {
  id: string;
  name: string;
  SVGCode: string;
}

/**
 * @description 用户图标类型
 */
export interface UserIconType {
  id: string;
  name: string;
}

/**
 * @description 系统图标请求响应参数类型
 */
export interface SystemIconResType {
  svg_code: SystemIconType[];
}

/**
 * @description 用户图标请求响应参数类型
 */
export interface UserIconsResType {
  icons: UserIconType[];
}

/**
 * @description 创建种类父级参数类型
 */
export interface CreateKindsParentParamsType {
  name: string;
  file_name: string;
  svg_code_id: string;
}

/**
 * @description 创建种类父级请求响应参数类型
 */
export interface CreateKindsParentResType {
  success: boolean;
}
