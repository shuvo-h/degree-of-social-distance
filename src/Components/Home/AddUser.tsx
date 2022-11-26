import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { db } from '../../fake_db/fake_db';
import { DbType } from '../../types/db.type';
import { RelationType, UserType } from '../../types/user.type';


const relationshipStatus = ["Mother-Son","Father-Son","Friend","Mother-Daughter","Father-Daughter"];

type AddUserPropType = {
    setAllUsers: React.Dispatch<React.SetStateAction<DbType>>
    allUsers: DbType
}

const AddUser = ({allUsers,setAllUsers}:AddUserPropType):JSX.Element => {
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
        <Box
            sx={{
                backgroundColor:"#fff",
                margin:"2rem auto",
                padding:"1.5rem 3rem",
            }}
        >
            <Typography sx={{margin:"1rem auto", backgroundColor:"#F0F8FF", padding:"5px 14px"}} variant='h5'>Add a New User</Typography>
            <FormControl>
                <InputLabel htmlFor="Name">Full Name</InputLabel>
                <Input onChange={e=>setName(e.target.value)} id="Name" aria-describedby="my-helper-text" />
                <FormHelperText id="Name-helper-text">We'll share your name with other users.</FormHelperText>
            </FormControl>
            <Box sx={{display:"grid",gridTemplateColumns:"repeat(5,1fr)"}}>
                {
                    name && allUsers.map(user => <Box key={user.id}>
                        <Box 
                            sx={{
                                backgroundColor: currentSelection.id === user.id ? "orange":"",
                                margin: "4px",
                                border:"1px solid lightblue",
                                borderRadius:"8px",
                                width:"250px",
                                height:"80px",
                                display:"flex",
                                flexDirection:"column",
                                justifyContent:"center",
                                alignItems:"center",
                            }} 
                            onClick={()=>handleCurrentSelection(user.id,user.name)} 
                        >
                            <Typography variant='h6'>{user.name}</Typography>
                            <Typography variant='body1'>{getRelationStatus(user.id)}</Typography>
                        </Box>
                    </Box>)
                }
            </Box>

            
            <Box>
                {
                    !!currentSelection.id && <FormControl sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel id='relation-status'>Choose Relationship</InputLabel>
                        <Select 
                            labelId='relation-status'
                            id='relation-statuss'
                            value={currentSelection.status}
                            label="Relationship"
                            onChange={handleCurrentRelation}
                        >
                            <MenuItem>
                                <em>None</em>
                            </MenuItem>
                            {
                                relationshipStatus.map(status => <MenuItem value={status} key={status}>{status}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
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