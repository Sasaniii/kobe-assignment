import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
   <div>
     <br></br>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5,  }} />
    {/* <TextField id="input-with-sx" label="Search Here" variant="standard" /> */}
    <TextField
          id="input-with-sx"
          placeholder='search'
          // label="Search Here"
          InputProps={{
            sx: { height: '35px' }, // Adjust the height as needed
          }}
         
        //   variant="standard"
        />
  </Box>
   </div>
  );
}