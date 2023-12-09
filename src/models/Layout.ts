export interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export interface TableHeader {
  key: string;
  label: string;
}

export interface LayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  children: React.ReactNode;
}

export interface MUITableProps {
  data: any[];
  headers: TableHeader[];
  renderCell?: (header: TableHeader, row: any) => React.ReactNode;
}

export interface LoginProps {
  onAuthenticated: (authenticated: boolean) => void;
}