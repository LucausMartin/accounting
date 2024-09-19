export interface KindParentType {
  id: string;
  name: string;
  fileName: string | null;
  svgCodeId: ScgCodeIdType | null;
  children: KindChildType[];
}

interface ScgCodeIdType {
  id: string;
  name: string;
  SVGCode: string;
}

export interface KindChildType {
  id: string;
  name: string;
  fileName: string | null;
  svgCodeId: ScgCodeIdType | null;
}

export interface GetKindParentsResType {
  kinds_parents: KindParentType[];
}

export interface AccountAddItemParamsType {
  parent_kind_id: string;
  child_kind_id: string;
  account_id: string;
  remark: string;
  cost: string;
  type: number;
  time: string;
}

export interface AccountAddItemResType {
  success: boolean;
}
