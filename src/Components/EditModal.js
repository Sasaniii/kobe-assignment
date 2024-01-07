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
import dayjs from 'dayjs';

function EditModal(props ) {

//   const { editModalOpen, addTask, setTaskAvailability, onClose, taskDetails, onSave } = props;
// const {onClose} = props;
  // const {modalOpen} = props;
  
  const {  taskDetails, onSave , editModalOpen, onClose} = props;

  const [selectedDate, setSelectedDate] = useState(null);
  const [age, setAge] = useState('');
  const [priority, setPriority] = useState('');
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState(1);

  const [editedTaskName, setEditedTaskName] = React.useState('');
  const [editedDateTime, setEditedDateTime] = React.useState('');
  const [editedPriority, setEditedPriority] = React.useState('');

  React.useEffect(() => {
    // Set the initial values when taskDetails change
    setEditedTaskName(taskDetails.taskName || '');
    setEditedDateTime(taskDetails.dateTime || '');
    setEditedPriority(taskDetails.priority || '');
  }, [taskDetails]);
 
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

//   const handleOK = () => {
    
//     // Gather all the information entered in the modal
//     const taskData = {
//       id: generatedId,
//       taskName: taskName,
//       dateTime: selectedDate,
//       priority: priority,
//     };

//     // Call the addTask function passed from TaskManager
//     addTask(taskData);
    

//     // Close the modal
//     editModalOpen(false);
//     setTaskAvailability(true);
//     console.log('menna', taskData);
//   };


  const handleSave = () => {
    // Collect the updated task data
    const updatedTask = {
      ...taskDetails,
      taskName: editedTaskName,
      dateTime: editedDateTime,
      priority: editedPriority,
    };

    // Invoke the onSave callback to send the updated task data back to the parent component
    onSave(updatedTask);
    onClose(); // Close the modal after saving
  };

  // useEffect(() => {
  //   return () => {
  //     // Clear localStorage when the component unmounts
  //     localStorage.removeItem('tasks');
  //   };
  // }, []); // Run this effect only once on mount
  const handleClose = () => {
    editModalOpen(false);
  };

 
  return(
<div>
<form ref={formRef}>
<Typography id="modal-modal-title" variant="h6" component="h2" className='pb-2'>
      Add Your Task Here
    </Typography>

    <TextField fullWidth label="Task Name"  id="fullWidth" className='pb-2 pt-6' value={editedTaskName}
        onChange={(e) => setEditedTaskName(e.target.value)}/>
    
    <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          className='pb-4'
         
        />

<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker className='pb-4' label="Basic date time picker"  value={dayjs(editedDateTime)}
        onChange={(e) => setEditedDateTime(e.target.value)}/>
    </LocalizationProvider>

    <FormControl fullWidth className='pb-2'>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={editedPriority}
        onChange={(e) => setEditedPriority(e.target.value)}
          label="Age"
          
          
        >
          <MenuItem value={10}>High</MenuItem>
          <MenuItem value={20}>Medium</MenuItem>
          <MenuItem value={30}>Low</MenuItem>
        </Select>
      </FormControl>

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <div className='pr-2'><Button onClick={handleSave}>OK</Button></div>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleClose}>cancel</Button>
    </ButtonGroup>
</form>
</div>
  );
}

export default EditModal;