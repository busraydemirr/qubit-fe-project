export interface MenuItem {
  label: string;
  url: string;
  isActive: boolean;
  children?: MenuItem[];
  depth?: number;
}
