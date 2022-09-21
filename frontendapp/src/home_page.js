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
import "./popup/popupscreen.css";
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
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

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
              <menuItem onClick={toggleModal}>Upload</menuItem>
              
            </Menu>
          </div>
          {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      </Toolbar>
        </AppBar>
        
         </>
  );
};
