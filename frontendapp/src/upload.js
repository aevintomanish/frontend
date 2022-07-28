import React from 'react';
import { render } from 'react-dom';
import TextField from '@mui/material/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import jquery from 'jquery';
import { createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { Alert,AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const theme = createTheme({
    palette: {
        mode: 'Dark',
      primary: {
        
        main: '#212121',
      },
      secondary: {
        
        main: '#212121',
      },
    },
  });
  
  
  
class upload extends React.Component {
  
  processFile = (e) => {
    jquery.ajax({
      url: "https://still-smoke-228.getsandbox.com/testUpload", 
      type: "POST",
      data: this.refs.upload.input.files[0],
      processData: false
    });
  }
 
  
  render() {
    return (
    
      <div style={styles}>
        
        <Box component="form"  noValidate sx={{ mt: 1 }}>
        <MuiThemeProvider>
          <div>
            <TextField type="file" ref="upload"  />
            <input type="submit" onClick={this.processFile} />
          </div>
        </MuiThemeProvider>
        
        </Box>
      </div>
      
    );
    
  }
} 
render(<upload />, document.getElementById('root'));

export default upload;