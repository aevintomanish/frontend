import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef,useState } from 'react';
import { login } from './firebase';
import { Alert,AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      
      main: '#f50057',
    },
    secondary: {
      
      main: '#212121',
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
const styles = {
  paperContainer: {
      backgroundImage: `url(${"static/src/img/main.jpg"})`
  }
};


export default function signin() {
  
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
    await login(data.get('email'),data.get('password'));
    setSuccess(true);
    setError("");
    nav('/debug');
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
            Sign In
          </Typography>
          <Box component="form" disabled={loading} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error">
          <AlertTitle>Can't signin</AlertTitle>
          {error}</Alert>}
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
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              bgcolor= "black"
            >
              Sign In
            </Button>
            {success && <Alert severity="success" >
            <AlertTitle>You have successfully signined</AlertTitle>
                  Do it  — <strong>Hand-Right</strong>
              </Alert>}
            <Grid container>
             
              <Grid item>
              
                
                <Link to="/tosignup">
                 Dont have a account signup...?
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

