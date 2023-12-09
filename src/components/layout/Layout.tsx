import React from 'react';
import Header from './Header';
import { LayoutProps } from '../../models/Layout';

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, onLogout, children }) => {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <div style={{ marginTop: '64px' }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
