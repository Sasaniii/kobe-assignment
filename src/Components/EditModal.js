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


  
  const {  taskDetails, onSave , editModalOpen, onClose} = props;

  const [selectedDate, setSelectedDate] = useState(null);
  const [age, setAge] = useState('');
  const [priority, setPriority] = useState('');
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState(1);
  const [isValid, setIsValid] = useState(false);

  const [editedTaskName, setEditedTaskName] = React.useState('');
  const [editedDateTime, setEditedDateTime] = React.useState(dayjs(taskDetails.dateTime));
  const [editedPriority, setEditedPriority] = React.useState('');

  React.useEffect(() => {
    // Set the initial values when taskDetails change
    setEditedTaskName(taskDetails.taskName || '');
    setEditedDateTime(taskDetails.dateTime || '');
    setEditedPriority(taskDetails.priority || '');
  }, [taskDetails]);

 

  const formRef = useRef(null);

  const handleReset = (prioritySetUp) => {

      formRef.current.reset();
      setSelectedDate(null);
      setPriority('');
    
  };

  const generatedId = useId();



  const handleSave = () => {

    const updatedTask = {
      ...taskDetails,
      taskName: editedTaskName,
      dateTime: editedDateTime,
      priority: editedPriority,
    };
    onSave(updatedTask);
    onClose(); 
  };

  const handleClose = () => {
    editModalOpen(false);
  };

  useEffect(() => {
    const isFormValid = taskName !== '' && selectedDate !== null && priority !== '';
    setIsValid(isFormValid);
  }, [taskName, selectedDate, priority]);
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

 
  return(
<div>
<form ref={formRef}>
<div className='d-flex justify-content-start'><img src="editimg.png" alt="logo" width="200px" height="40px" className='pb-2' /> </div>

    <TextField fullWidth label="Task Name"  id="fullWidth" className='pb-2 mt-2' value={editedTaskName}
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
        <DateTimePicker className='pb-4' label="Basic date time picker"  value={editedDateTime}
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
          <MenuItem value='High'>High</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='Low'>Low</MenuItem>
        </Select>
      </FormControl>

     
      <div className='d-flex justify-content-end'><button style={styles.modalBtn} type="button" onClick={handleSave} >OK</button>
          <button type="button" style={styles.modalBtn} onClick={handleReset}>Reset</button>
          <button type="button" style={styles.modalBtn} onClick={handleClose}>cancel</button>
          </div>
</form>
</div>
  );
}

const styles = {

  modalBtn : {
    backgroundColor: '#FA8BFF',
    backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
    border: '2px',
    borderRadius: '8px',
    padding: '5px',
    height:'40px',
    width:'100px',
    color:'white',
  },
};


export default EditModal;