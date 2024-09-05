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
 * @description 系统图标请求响应参数类型
 */
export interface SystemIconResType {
  svg_code: SystemIconType[];
}
