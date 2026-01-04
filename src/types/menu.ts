export interface menuItem{
    label: string;
    key: string;
    icon?: React.ReactNode;
    children?: menuItem[];
}
export interface routerItem{
    path: string;
    meta:metaItem;  // 修复：将meta类型从menuItem改为metaItem
    element: React.ReactNode;
    children?: routerItem[];
}
export interface metaItem{
    title: string;
    icon?: string;
    showInMenu: boolean;
}
export type IconMap ={
  [key:string]:React.FC
}