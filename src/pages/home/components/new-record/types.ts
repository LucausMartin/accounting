export interface KindParentType {
  id: number;
  name: string;
  kind_children: KindChildType[];
}

export interface KindChildType {
  id: number;
  name: string;
}

export interface GetKindParentsResType {
  kind_parents: KindParentType[];
}
