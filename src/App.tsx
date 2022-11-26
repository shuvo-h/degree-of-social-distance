import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline ,Box,Paper,Typography} from '@mui/material';
import Button from '@mui/material/Button';
import NavBar from './Components/Common/NavBar';
import DegreeOfSeparation from './Components/Home/DegreeOfSeparation';
import AddUser from './Components/Home/AddUser';
import { DbType } from './types/db.type';
import MakeRelationship from './Components/Home/MakeRelationship';

// styles start 
const relation_user_container = {
    backgroundColor:"#eff4fb", 
    minHeight:"100vh"
}
const user_relation_btns = {
  height:"80px",
  backgroundColor:"#fff", 
  display:"flex", 
  alignItems:"center", 
  justifyContent:"center"
}
const btn_hover = {
  "&:hover":{
    // backgroundColor:"green",
    transition:"all 0.4s ease-in-out",
    color:"yellowgreen"
  }
}

const makeRelation_container = {
  transformOrigin:"top", 
  transition:"all 0.9s ease-in-out",
}
// styles end

function App() {
  const [allUsers,setAllUsers] = useState<DbType>([]);
  const [sectionOpen,setSectionOpen] = useState<string | null>(null);

  
    // load store data automatic on page load 
    useEffect(()=>{
      const stringifiedUsers = localStorage.getItem("users");
      if (stringifiedUsers) {
          setAllUsers(JSON.parse(stringifiedUsers));
      }
  },[])


  return (
    <Box sx={relation_user_container}>
      <NavBar></NavBar>
      <Box sx={{margin:"2rem 10%"}}>
        <DegreeOfSeparation setAllUsers={setAllUsers} allUsers={allUsers}></DegreeOfSeparation>
        
        <Box sx={user_relation_btns}>
          <Box sx={{display:"block", width:"100%"}}>
            <Box sx={{display:"flex", justifyContent:"space-around"}}>
              <Button sx={{...btn_hover}} onClick={()=>setSectionOpen("add_user")} variant="contained">Add New User</Button>
              <Button sx={{...btn_hover}} onClick={()=>setSectionOpen("make_relation")} variant="contained">Make New Relation</Button>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{
            ...makeRelation_container,
            transform: `scaleY(${sectionOpen === "add_user" ?  1:0})`,
            maxHeight: sectionOpen === "add_user" ? "50px":"0px",
          }}
        >
          {
             <AddUser setAllUsers={setAllUsers} allUsers={allUsers} setSectionOpen={setSectionOpen}></AddUser>
          }

        </Box>
        <Box sx={{
          ...makeRelation_container,
            transform: `scaleY(${sectionOpen === "make_relation" ?  1:0})`,
          }}>
          {
            <MakeRelationship setAllUsers={setAllUsers} allUsers={allUsers} setSectionOpen={setSectionOpen}></MakeRelationship>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default App;
