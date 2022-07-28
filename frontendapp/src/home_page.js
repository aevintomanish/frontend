import * as React from 'react';
import { useAuth,logout } from './firebase';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Upload from './upload';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import { useRef,useState } from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function home_page () {
const [anchorEl, setAnchorEl] = React.useState(null);
const nav = useNavigate();
const currentUser = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  async function handleLogout (event) {
    
    try{
   await logout();
   nav('/');
  }
  catch(err){
   alert("low speed internet");
  }

  };
  return (
        <>
        
        <AppBar color="transparent" position="static">
           <Toolbar>
           <Button variant="outlined" href=" http://localhost:5000 ">
              Convertor
           </Button>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >      
              <MenuItem onClick={handleClose}><div>Email is :{ currentUser &&currentUser.email? currentUser.email:"Not loaded yet"}</div></MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        
      </Toolbar>
        </AppBar>
        
         </>
  );
};
