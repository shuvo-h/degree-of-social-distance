import React, { useEffect, useState } from 'react';

import { relationDegreeFinder } from '../../utils/relationDegreeFinder';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DbType } from '../../types/db.type';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

 type DegreeOfSeparationPropType = {
    setAllUsers: React.Dispatch<React.SetStateAction<DbType>>
    allUsers: DbType
 }

const DegreeOfSeparation = ({allUsers,setAllUsers}:DegreeOfSeparationPropType) => {
    const [maxDegree,setMaxDegree] = useState<number>(5);
    const [relationDegree,setRelationDegree] = useState<string>("");
    // const [allUser,setAllUser] = useState<DbType>([]);
    const [searcherID, setSearcherID] = useState<number | null>(null);
    const [searchingID, setSearchingID] = useState<number | null>(null);

    const handleSearchChange = (event: SelectChangeEvent,setState:React.Dispatch<React.SetStateAction<number|null>>) => {
        const id = event.target.value;
        setState(parseInt(id));
    };
  

    useEffect(()=>{
        // get name of the user
        const name = allUsers.find(user => user.id === searcherID)?.name;
        if (searcherID && searchingID && name) {
            // const relationDegreeRes = relationDegreeFinder(db,1,4,0,[1],"A",maxDegree);
            const relationDegreeRes = relationDegreeFinder(allUsers,searcherID,searchingID,0,[searcherID],name,maxDegree);
            // console.log(relationDegreeRes);
            const isNotFound = relationDegreeRes?.split(" > ").includes("Not Found");
            if (isNotFound) {
                setRelationDegree(`There is no relationship upto ${maxDegree} degree!`);
            }else if(relationDegreeRes){
                setRelationDegree(relationDegreeRes);
            }
        }
    },[maxDegree,searcherID,searchingID])

    const onDegreeChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const value = parseInt(event.target.value);
        setMaxDegree(value);
    }

    

    return (
        <Box sx={{}}>
            <Typography 
                sx={{
                    textAlign:"center",
                    backgroundImage: "linear-gradient(to right,#ff9800,#FFD100)",
                    maxWidth:"max-content",
                    margin:"2rem auto",
                    padding:"1.5rem 3rem",
                    borderRadius:"10px",
                }} 
                variant='h4'
            >Degree Of Separation</Typography>
            <Box sx={{backgroundColor:"#fff", padding:"12px 40px"}}>
                <Typography sx={{margin:"1rem auto", backgroundColor:"#F0F8FF", padding:"5px 14px"}} variant='h5'>Find Relation Degree between Two Users</Typography>
                <Box sx={{display:"flex", justifyContent:"space-between",}}>
                    <Box>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-standard-label">Searcher Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={searcherID?searcherID.toString():""}
                                onChange={(e:SelectChangeEvent)=>handleSearchChange(e,setSearcherID)}
                                label="Searcher"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    allUsers.map(user => <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel id="demo-simple-select-standard-label">Who are you searching?</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={searchingID?searchingID.toString():""}
                                onChange={(e:SelectChangeEvent)=>handleSearchChange(e,setSearchingID)}
                                label="Searcher"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    allUsers.map(user => <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                            <TextField
                                sx={{
                                    padding:"0",
                                    width:"80px",
                                    // height:"20px"
                                }}
                                 size="small"
                                id="outlined-number"
                                label="Degree"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={maxDegree}
                                onChange={onDegreeChange}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Box 
                sx={{
                    margin:"3rem auto", 
                    minWidth:"700px",
                    maxWidth:"fit-content", 
                    minHeight:"80px", 
                    padding:"1rem 2rem",
                    // backgroundImage: "linear-gradient(to right,#ff9800,#FFD100)",
                    backgroundColor:"#fff",
                    borderRadius:"10px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    color:"blue"
                }}
            >
                <Typography sx={{textAlign:"center", }} variant='h4'>{relationDegree.length ? relationDegree : "Looking for the Degree...."}</Typography>
            </Box>
        </Box>
    );
};

export default DegreeOfSeparation;