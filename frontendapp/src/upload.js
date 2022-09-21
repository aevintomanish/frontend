import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render } from "react-dom";
import { storage } from "./firebaseis";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuth } from "./firebase";
import { db } from "./firebase2";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";



const theme = createTheme({
  palette: {
    primary: {
      
      main: '#f50057',
    },
    secondary: {
      
      main: '#f50057',
    },
  },});
const upload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const currentUser = useAuth();
  const usersCollectionRef = doc(db, "handright","ttffile");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    
    
    uploadTask.on(
      "state_changed",
      
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        switch (snapshot.state) {
          case 'running':
                setLoading(true);
                setSuccess(false);
        if (snapshot.bytesTransferred==snapshot.totalBytes)
        { createUser();
          setSuccess(true);
        setLoading(false);}}
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            
          });
      }
    );
 
     
      
    
  };

  {url && console.log("image: ", url);}

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, { link: currentUser.username, link:url  });
  };



  return (
    <div>
      <LinearProgress variant="buffer" value={progress} />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="secondary"
          sx={buttonSx}
          onClick={handleUpload}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={handleUpload}
      
        >
          Accept terms
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
      <br />

    </div>
  );
};

render(<upload />, document.querySelector("#root"));

export default upload;