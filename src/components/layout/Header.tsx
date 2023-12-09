import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HeaderProps } from '../../models/Layout';

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Bent Oak Test
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        ) : (
          <>
            <Button color="inherit" onClick={handleLogin}>Login</Button>
            <Button color="inherit" onClick={handleSignup}>Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
