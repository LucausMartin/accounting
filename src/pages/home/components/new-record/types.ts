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
}

export interface GetKindParentsResType {
  kinds_parents: KindParentType[];
}
