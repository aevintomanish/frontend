import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import { useAuth,logout } from '../firebase';
//import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as Scroll } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import "../popup/popupscreen.css"
import Upload from '../upload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Button from '@mui/material/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '5rem',
  },
  colorText: {
    color: '#f50057',
  },
  Menu:{
    background:'transparent',
    color:'#e3f2fd',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#f50057',
    fontSize: '5rem',
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
const nav = useNavigate();
const currentUser = useAuth();


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
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
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
           Hand-<span className={classes.colorText}>Right.</span>
          </h1>
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
              <MenuItem onClick={toggleModal}>Upload <UploadFileIcon/></MenuItem>
              <MenuItem >Convertor<NoteAltIcon/></MenuItem>
              <MenuItem onClick={handleLogout}>Logout<LogoutIcon/></MenuItem>
              
            </Menu>
            </Toolbar>
      </AppBar>
            {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Upload your ttf file</h2>
            <Upload/>
            <button className="close-modal"  onClick={toggleModal}>
            <CloseIcon/>
            </button>
          </div>
        </div>
      )}
       

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            Hand-<span className={classes.colorText}>Right.</span>
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}