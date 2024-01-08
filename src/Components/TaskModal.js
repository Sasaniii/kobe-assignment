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
import { useState, useRef, useEffect, useId } from 'react';
import dayjs from 'dayjs';

function TaskModal(props) {

  const { modalOpen, addTask, setTaskAvailability } = props;


  const [selectedDate, setSelectedDate] = useState(dayjs('2024-01-01T15:30'));
  const [priority, setPriority] = useState('');
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // fields are empty?
    const isFormValid = taskName.trim() !== '' && selectedDate !== null && priority !== '';
    setIsValid(isFormValid);
  }, [taskName, selectedDate, priority]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formRef = useRef(null);

  const handleReset = (prioritySetUp) => {

    formRef.current.reset();
    setTaskName('');
    setSelectedDate(null);
    setPriority('');

  };

  const handleChange = (event) => {
    setPriority(event.target.value);

  };

  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };

  // const formattedDate = selectedDate.format('MM-DD-YYYY HH:mm aa'); 

  const generatedId = useId();

  const handleOK = () => {
  
    const taskData = {
      id: generatedId,
      taskName: taskName,
      dateTime: selectedDate,
      priority: priority,
    };

    addTask(taskData);
    modalOpen(false);
    setTaskAvailability(true);
    console.log('menna', taskData);
  };
  const handleClose = () => {
    modalOpen(false);
  };

  return (
    <div >
      <form ref={formRef}>
      <div className='d-flex justify-content-start'><img src="addimg.png" alt="logo" width="200px" height="40px" className='pb-2' /> </div>

        <TextField fullWidth label="Task Name*" value={taskName} id="fullWidth"  onChange={handleNameChange}
        className='pb-2 pt-6' />
        {/* <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" /> */}
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          className='pb-4'
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker className='pb-4'
           label="Pick a date and time*" onChange={handleDateChange} value={selectedDate} />
        </LocalizationProvider>

        <FormControl fullWidth 
        className={`pb-2 ${priority === '' ? 'error' : ''}`}>
          <InputLabel id="demo-simple-select-label">Priority*</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority}
            label="priority"
            onChange={handleChange}

          >
            <MenuItem value='High'>High</MenuItem>
            <MenuItem value='Medium'>Medium</MenuItem>
            <MenuItem value='Low'>Low</MenuItem>
          </Select>
          <p> Make sure to fill in all the mandatory fields* before clicking OK</p>
        </FormControl>

          <div className='d-flex justify-content-end'><button style={styles.modalBtn} type="button" onClick={handleOK} disabled={!isValid}>OK</button>
          <button type="button" style={styles.modalBtn} onClick={handleReset}>Reset</button>
          <button type="button" style={styles.modalBtn} onClick={handleClose}>cancel</button>
          </div>
      </form>
    </div>
  );
}
const styles = {
  modal : {
    backgroundColor: '#FA8BFF',
    backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
    height:'400px',
  },

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

export default TaskModal;