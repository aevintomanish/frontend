import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {signup} from "./firebase"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef,useState } from 'react';
import { async } from '@firebase/util';
import { Alert,AlertTitle } from '@mui/material';
import Upload from './upload';
const theme = createTheme({
  palette: {
    primary: {
      
      main: '#f50057',
    },
    secondary: {
      
      main: '#616161',
    },
  },
});
function Copyright(props) {
  return (
    <Typography variant="body2" color="#808080" align="center" {...props}>
      {'Copyright © '}
      <Typography color="inherit">
        Hand-Right
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function tosignup() {
  const[ loading, setLoading ] = useState(false);
  const[ Email, setEmail ] = useState("");
  const[ password, setPassword ] = useState("");
  const[ error, setError] = useState("");
  const[ success, setSuccess] = useState("");
  const nav = useNavigate();
  async function handleSubmit (event) {
    setLoading(true);
    try{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signup(data.get('email'),data.get('password'));
    setSuccess(true);
    setError("");
    
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      
    });
  }
  catch(err){
    setSuccess("");
    setError(err.message);
  }
  setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
      backgroundImage: `url("https://via.placeholder.com/500")` 
    }}></div>
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background:'white'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#f50057" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Alert severity="info">
          <AlertTitle>upload the file to complete the signup...!!!</AlertTitle>
          </Alert>
          <Box component="form" disabled={loading} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error">
          <AlertTitle>Can't signup</AlertTitle>
          
            {error}<strong>Chnage it</strong></Alert>}

           
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
           <Typography>Handscript (*must be a ttf file)</Typography>
           <Upload/>
           
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              bgcolor= "black"
            >
              Sign Up
            </Button>
            {success && <Alert severity="success" >
            <AlertTitle>Signup Successfull</AlertTitle>
                  Ur part of  — <strong>Hand-Right</strong>
              </Alert>}
            <Grid container>
             
              <Grid item>
              
                
                <Link to="/">
                  Do you have an account? Sign in
                  </Link>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
