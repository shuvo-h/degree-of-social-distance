import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline ,Box,Paper,Typography} from '@mui/material';
import NavBar from './Components/Common/NavBar';
import DegreeOfSeparation from './Components/Home/DegreeOfSeparation';


function App() {
  
  return (
    <Box>
      <NavBar></NavBar>
      <DegreeOfSeparation></DegreeOfSeparation>
    </Box>
  );
}

export default App;
