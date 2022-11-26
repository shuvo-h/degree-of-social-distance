import { Box, Grid, Typography,SelectChangeEvent } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { DbType } from '../../types/db.type';
import Paper from '@mui/material/Paper';
import { UserType } from '../../types/user.type';
import RelationOptions from './RelationOptions';
import {blueGrey, lime } from '@mui/material/colors';
import Button from '@mui/material/Button';


type MakeRelationshipPropType = {
    setAllUsers: React.Dispatch<React.SetStateAction<DbType>>
    allUsers: DbType,
    setSectionOpen: React.Dispatch<React.SetStateAction<string|null>>
}

const MakeRelationship = ({allUsers,setAllUsers,setSectionOpen}:MakeRelationshipPropType) => {
    const [selected,setSelected] = useState<UserType[]>([]);
    const [relationStatus,setRelationStatus] = useState<string>("");
    const [existRelation,setExistRelation] = useState<string>("");
    
    const handleRelationMake = (user:UserType) =>{
        // check if the user is already exist, then remove, else push
        const isExist = selected?.find((existUser:UserType) => existUser?.id === user?.id);
        if (isExist) {
            // remove it
            setSelected(selected?.filter((existUser:UserType) => existUser?.id !== user?.id))
        }else{
            if (selected.length < 2) {
                setSelected([...selected,user])
            }
        }
    }

    const handleRelationChange = (e:SelectChangeEvent) =>{
        const user_1 = selected[0];
        const user_2 = selected[1];
        const status = e.target.value;
        setRelationStatus(status);
        if (status && user_1?.id && user_2?.id) {
            // check in relations_1 if exist in user_2
            const existIdx_1 = user_1.relations.findIndex(el=>el.id === user_2.id);
            if (existIdx_1 > -1) {
                // replace the relation
                user_1.relations.splice(existIdx_1,1,{id:user_2.id,status: status})
            }else{
                // push the new relation 
                user_1.relations.push({id:user_2.id,status: status})
            }
            // check in relations_2 if exist in user_1
            const existIdx_2 = user_2.relations.findIndex(el=>el.id === user_1.id);
            if (existIdx_2 > -1) {
                // replace the relation
                user_2.relations.splice(existIdx_2,1,{id:user_1.id,status: status})
            }else{
                // push the new relation 
                user_2.relations.push({id:user_1.id,status: status})
            }
            setSelected([user_1,user_2]);
        }
    }

    useEffect(()=>{
        // get relationship between two selected user 
        const user_1 = selected[0];
        const user_2 = selected[1];
        const relation = user_1?.relations?.find(user_rel => user_rel?.id === user_2?.id)?.status;
        
        setExistRelation(relation??"");
        
    },[selected.length])

    const handleSaveRelationShip = () =>{
        if (selected.length ===2 && relationStatus) {
            // find the two user and replace them (since relationship data is already pushed)
            const newUserList = [...allUsers];
            const userIdx_1 = newUserList.findIndex(user=>user.id === selected[0].id);
            newUserList[userIdx_1].relations = selected[0].relations;
            const userIdx_2 = newUserList.findIndex(user=>user.id === selected[1].id);
            newUserList[userIdx_2].relations = selected[1].relations;
            
            localStorage.setItem("users",JSON.stringify(newUserList));
            setAllUsers(newUserList);
            setRelationStatus("");
            setSelected([]);
            setExistRelation("");
            
            // newUserList
        }
    }

    return (
        <Box
            sx={{
                backgroundColor:"#fff",
                margin:"2rem auto",
                p: 5,
                pb:8
            }}
        >
            <Box textAlign='right'>
                <Button 
                    sx={{
                        transition:"all 0.3s ease-in-out",
                        fontSize: "22px",
                        padding:"0",
                        "&:hover" : {color:"white", backgroundColor:"red"}
                    }}
                    color='error' variant={"outlined"}
                    onClick={()=>setSectionOpen(null)}
                >X</Button>
            </Box>
            <Paper elevation={3}>
                <Typography sx={{margin:"1rem auto", backgroundColor:"#F0F8FF", padding:"5px 14px"}} variant='h5'>Make a New Relation</Typography>
            </Paper>
            <Box>
                <Box sx={{margin:"2rem auto"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={7} lg={5} >
                                <Paper sx={{padding:"14px",height:"110px"}} elevation={1}>
                                    <Typography variant='h6' textAlign='center' textTransform={"capitalize"}>{selected[0]?.name}</Typography>
                                        {
                                            selected.length === 2 && existRelation && <Typography  sx={{color: blueGrey[400]}} variant='body1' textAlign='center'>
                                                    Already <span style={{fontWeight:700}}>{existRelation}</span> relationship with <span  style={{fontWeight:700,}}>{selected[1]?.name}</span> 
                                                </Typography>
                                        }
                                </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={2}>
                                <Paper sx={{padding:"14px",}} elevation={1}>
                                    <Box textAlign='center'>
                                        <RelationOptions status={relationStatus} onHandle={handleRelationChange} disabled={selected.length === 2 ? false:true}></RelationOptions>
                                    </Box>
                                    <Box textAlign='center'>
                                        <Button onClick={handleSaveRelationShip} variant="contained" disabled={relationStatus && selected.length === 2 ? false:true}>Set Relationship</Button>
                                    </Box>
                                </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={7} lg={5}>
                                <Paper sx={{padding:"14px", height:"110px"}} elevation={1}>
                                    <Typography variant='h6' textAlign='center'  textTransform={"capitalize"}>{selected[1]?.name}</Typography>
                                    {
                                        selected.length === 2 && existRelation &&
                                            <Typography sx={{color: blueGrey[400]}} textAlign='center' variant='body1' >
                                                Already <span style={{fontWeight:700}}>{existRelation}</span> relationship with <span  style={{fontWeight:700}}>{selected[0]?.name}</span>
                                            </Typography>
                                    }
                                </Paper>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {
                            allUsers.map(user => <Grid 
                                    onClick={()=>handleRelationMake(user)} 
                                    item xs={12} sm={6} md={3} lg={2} 
                                    key={user.id}
                                >
                                <Paper 
                                    sx={{
                                        p:2,
                                        cursor:"pointer",
                                        backgroundColor: selected.findIndex(el=>el.id === user.id) > -1 ? "info.main" : "",
                                        color: selected.findIndex(el=>el.id === user.id) > -1 ? lime["A400"] : "",
                                        transition:"all 0.5s ease-in-out",
                                    }} 
                                    elevation={2}
                                >
                                    <Typography variant='h6' textTransform={"capitalize"} textAlign="center">{user.name}</Typography>
                                </Paper>
                            </Grid>)
                        }
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default MakeRelationship;