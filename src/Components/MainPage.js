
import * as React from 'react';
import TaskModal from './TaskModal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ClickAwayListener } from '@mui/material';
import { useState, useEffect } from 'react';
import TaskList from './TaskList';

function MainPage() {

  const [open, setOpen] = useState(false);

  const [taskAvailability, setTaskAvailability] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

  }, []);

  console.log(tasks, 'menna stored tasks');

  const addTask = (newTask) => {

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Store updated tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
   
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(true);
  };


  return (
    <div style={styles.pageBg}>
      <br/>
      <div className='container' style={styles.container}>
      <div className='d-flex justify-content-center'><img src="logot.png" alt="logo" width="200px" height="200px" /> </div>
      <div className='d-flex justify-content-center'><img src="start.png" alt="logo" width="300px" height="40px" /> </div>
      <div className='d-flex justify-content-center p-4' ><button onClick={handleOpen} type="button" style={styles.taskBtn}>ADD YOUR TASK HERE +</button></div>
      </div>
        <div>
          <TaskList tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} />
        </div>
      

      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ClickAwayListener onClickAway={handleOpen} >

          <Box sx={styles.BoxStyle} disableBackdropClick={true}>
            <div className="d-flex justify-content-end">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              className="d-flex justify-content-end"
            >
              <CloseIcon />
            </IconButton>
            </div>
            <TaskModal modalOpen={setOpen} addTask={addTask} setTaskAvailability={setTaskAvailability}/>
                   </Box>
        </ClickAwayListener>
      </Modal>
      </div>

    
    </div>
  );
}

const styles = {


  boxStyle1 : {
    backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
    height:'800px',
    width:'700px',
  },

  pageBg : {
    height: '640px',
    backgroundColor: '#3EECAC',
    backgroundImage: 'linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%)',
    // overflow:'hidden',

  },

  container : {
    width:'30%',
    height:'55%',
    border: '2px',
    borderRadius: '8px',
    padding: '5px',
    backgroundColor: '#8BC6EC',
    backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
  },

  taskBtn : {
    backgroundColor: '#FA8BFF',
    backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
    border: '2px',
    borderRadius: '8px',
    padding: '5px',
    height:'50px',
    width:'200px',
    color:'white',
  },

  modal : {
    backgroundColor: '#FA8BFF',
    backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
  },
  BoxStyle : {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },

  
};

export default MainPage;
