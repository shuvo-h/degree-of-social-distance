import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline ,Box,Paper,Typography} from '@mui/material';
import NavBar from './Components/Common/NavBar';
import DegreeOfSeparation from './Components/Home/DegreeOfSeparation';
import AddUser from './Components/Home/AddUser';
import { DbType } from './types/db.type';


function App() {
  const [allUsers,setAllUsers] = useState<DbType>([]);

  
    // load store data automatic on page load 
    useEffect(()=>{
      const stringifiedUsers = localStorage.getItem("users");
      if (stringifiedUsers) {
          setAllUsers(JSON.parse(stringifiedUsers));
      }
  },[])


  return (
    <Box sx={{backgroundColor:"#eff4fb", minHeight:"100vh"}}>
      <NavBar></NavBar>
      <Box sx={{margin:"2rem 10%"}}>
        <DegreeOfSeparation setAllUsers={setAllUsers} allUsers={allUsers}></DegreeOfSeparation>
        <AddUser setAllUsers={setAllUsers} allUsers={allUsers}></AddUser>
      </Box>
    </Box>
  );
}

export default App;
