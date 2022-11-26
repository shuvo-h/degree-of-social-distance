import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { db } from '../../fake_db/fake_db';
import { DbType } from '../../types/db.type';
import { RelationType, UserType } from '../../types/user.type';
import RelationOptions from './RelationOptions';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// styls start 
const addUser_container = {
    backgroundColor:"#fff",
    margin:"2rem auto",
    padding:"1.5rem 3rem",
}
const close_btn = {
    transition:"all 0.3s ease-in-out",
    fontSize: "22px",
    padding:"0",
    "&:hover" : {color:"white", backgroundColor:"red"}
}
const add_title = {
    margin:"1rem auto", 
    backgroundColor:"#F0F8FF", 
    padding:"5px 14px"
}

const user_card = {
    width:{
        xs: "250px",
        sm: "auto",
        md:"300px"
    },
    height:"80px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
}
// styls end

type AddUserPropType = {
    setAllUsers: React.Dispatch<React.SetStateAction<DbType>>
    allUsers: DbType,
    setSectionOpen: React.Dispatch<React.SetStateAction<string|null>>
}

const AddUser = ({allUsers,setAllUsers,setSectionOpen}:AddUserPropType):JSX.Element => {
    // const [allUsers,setAllUsers] = useState<DbType>([]);
    const [name,setName] = useState<string>("");
    const [relations,setRelations] = useState<RelationType[]>([]);
    const [currentSelection,setCurrentSelection] = useState({name:"",id:0,status:""});

    const relationShiphandler = () =>{
        // check if already exist
        const exist = relations.findIndex((el:RelationType)=>el.id === currentSelection.id);
        
        if (exist > -1) {
            // replace the status
            const newList = relations.splice(exist,1,currentSelection);
            setRelations(newList);
        }else{
            setRelations([...relations,currentSelection]);
        }
        setCurrentSelection({name:"",id:0,status:""});
    }

    const handleCurrentSelection = (id:number,name:string) =>{
        setCurrentSelection({id,name,status:""});
    }

    const handleCurrentRelation = (e:SelectChangeEvent) =>{
        const status = e.target.value;
        setCurrentSelection({...currentSelection,status});
    }

    const handleAddUser = () =>{
        if (!name) {
            alert("Name is required!")
        }
        let users:DbType = [];
        // get all user from localstorage
        const usersResult = localStorage.getItem("users");
        if(usersResult){
            users = JSON.parse(usersResult);
            console.log(users);
        }
        const newUser = { 
            id: Date.now(),
            name: name,
            relations: relations.map(relation => ({id:relation.id,status:relation.status}))
        }
        // also update the relationship list to whome this new user has added
        relations.forEach(relation =>{
            // find and push into this new user as his/her relation array
            const userIdx = users.findIndex((user:UserType) => user.id === relation.id);
            users[userIdx].relations.push({id:newUser.id, status:relation.status})
            console.log(users);
            
        })
        const newUsers = [...users,newUser];
        localStorage.setItem("users",JSON.stringify(newUsers))
        setAllUsers(newUsers);
        // clear the new user's stste
        setRelations([]);
        setCurrentSelection({id:0,name:"",status:""});
        setName("");
    }


    const storeFakeDB = () =>{
        const users = JSON.stringify(db);
        localStorage.setItem("users",users);
    }


    const getRelationStatus = (id:number) =>{
        const selectedUser = relations.find(el => el.id === id);
        return selectedUser ? selectedUser.status : "";
    }
    
    return (
        <Box sx={addUser_container}>
            <Box textAlign='right'>
                <Button 
                    sx={close_btn}
                    color='error' 
                    variant={"outlined"}
                    onClick={()=>setSectionOpen(null)}
                >X</Button>
            </Box>
            <Typography sx={add_title} variant='h5'>Add a New User</Typography>
            <FormControl>
                <InputLabel htmlFor="Name">Full Name</InputLabel>
                <Input onChange={e=>setName(e.target.value)} value={name} id="Name" aria-describedby="my-helper-text" />
                <FormHelperText id="Name-helper-text">We'll share your name with other users.</FormHelperText>
            </FormControl>
            
            <Grid container  spacing={2}>
                {
                    name && allUsers.map(user => <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                        <Paper elevation={2} 
                            sx={{
                                ...user_card,
                                backgroundColor: currentSelection.id === user.id ? "orange":"",
                            }} 
                            onClick={()=>handleCurrentSelection(user.id,user.name)} 
                        >
                            <Typography variant='h6'>{user.name}</Typography>
                            <Typography variant='body1'>{getRelationStatus(user.id)}</Typography>
                        </Paper>
                    </Grid>)
                }
            </Grid>

            <Box>
                {
                    !!currentSelection.id && <RelationOptions status={currentSelection.status} onHandle={handleCurrentRelation}></RelationOptions>
                }
            </Box>
            
            
            <Box 
                textAlign={"center"}
                sx={{
                    maxWidth:"max-content", 
                    margin:"auto",
                }}
            >
                <Box>
                    {
                        <Button 
                                sx={{margin:"10px auto"}}
                                onClick={relationShiphandler} 
                                disabled={currentSelection.status ? false:true}
                                variant="contained"
                            >
                            Add {currentSelection.name ? currentSelection.name : "______"} is your {currentSelection.status ? currentSelection.status : "relative"}
                        </Button>
                    }
                </Box>
                <Box>
                    <Button  sx={{margin:"10px"}} disabled={name? false:true} onClick={handleAddUser} variant="contained">Add User</Button>
                    <Button  sx={{margin:"10px"}} onClick={storeFakeDB} variant="contained">Demo DB Setup</Button>
                </Box>
            </Box>
                
        </Box>
    );
};

export default AddUser;