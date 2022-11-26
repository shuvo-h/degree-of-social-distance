import React from 'react';
import { Box, Stack } from '@mui/system';
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

type RelationOptionsType = {
    status : String,
    onHandle: (e: SelectChangeEvent)=>void,
    disabled?: Boolean
}

const relationshipStatus = ["Mother-Son","Father-Son","Friend","Mother-Daughter","Father-Daughter"];

const RelationOptions = ({status,onHandle,disabled=false}:RelationOptionsType) => {
    return (
        <Box>
            <FormControl sx={{ m: 1, minWidth: 190 }}>
                    <InputLabel id='relation-status'>Choose Relationship</InputLabel>
                    <Select 
                        labelId='relation-status'
                        id='relation-statuss'
                        value={status}
                        label="Relationship"
                        onChange={onHandle}
                        disabled = {disabled}
                    >
                        <MenuItem>
                            <em>None</em>
                        </MenuItem>
                        {
                            relationshipStatus.map(status => <MenuItem value={status} key={status}>{status}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Box>
    );
};

export default RelationOptions;