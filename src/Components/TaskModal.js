import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState, useRef,useEffect, useId } from 'react';

function TaskModal(props ) {

  const { modalOpen, addTask, setTaskAvailability } = props;

  // const {modalOpen} = props;

  const [selectedDate, setSelectedDate] = useState(null);
  const [age, setAge] = useState('');
  const [priority, setPriority] = useState('');
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState(1);
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formRef = useRef(null);

  const handleReset = (prioritySetUp) => {

      formRef.current.reset();
      setSelectedDate(null);
      setPriority('');
    
  };

  const handleChange = (event) => {
    setPriority(event.target.value);
    
  };

  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const generatedId = useId();

  const handleOK = () => {
    
    // Gather all the information entered in the modal
    const taskData = {
      id: generatedId,
      taskName: taskName,
      dateTime: selectedDate,
      priority: priority,
    };

    

    // Call the addTask function passed from TaskManager
    addTask(taskData);
    

    // Close the modal
    modalOpen(false);
    setTaskAvailability(true);
    console.log('menna', taskData);
  };


  // useEffect(() => {
  //   return () => {
  //     // Clear localStorage when the component unmounts
  //     localStorage.removeItem('tasks');
  //   };
  // }, []); // Run this effect only once on mount
  const handleClose = () => {
    modalOpen(false);
  };

 
  return(
<div>
<form ref={formRef}>
<Typography id="modal-modal-title" variant="h6" component="h2" className='pb-2'>
      Add Your Task Here
    </Typography>

    <TextField fullWidth label="Task Name" value={taskName} id="fullWidth" className='pb-2 pt-6' onChange={handleNameChange}/>
    
    <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          className='pb-4'
         
        />

<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker className='pb-4' label="Basic date time picker"  onChange={handleDateChange} value={selectedDate}/>
    </LocalizationProvider>

    <FormControl fullWidth className='pb-2'>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          label="Age"
          onChange={handleChange}
          
        >
          <MenuItem value={10}>High</MenuItem>
          <MenuItem value={20}>Medium</MenuItem>
          <MenuItem value={30}>Low</MenuItem>
        </Select>
      </FormControl>

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <div className='pr-2'><Button onClick={handleOK}>OK</Button></div>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleClose}>cancel</Button>
    </ButtonGroup>
</form>
</div>
  );
}

export default TaskModal;