
import * as React from 'react';
import TaskModal from './TaskModal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import TaskList from './TaskList';
import TaskManager from './TaskManager';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function MainPage() {

  const [open, setOpen] = useState(false);
  //const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [taskAvailability, setTaskAvailability] = useState(true);
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
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
   <div>
   <h1 className="d-flex justify-content-center p-4">To-Do App</h1>
   <h2 className="d-flex justify-content-center p-4"> Let's Bind Your Time</h2>
   <h2 className="d-flex justify-content-center p-4"> Let's Get Started</h2>
   <div  className='d-flex justify-content-center p-4' ><button onClick={handleOpen}>Add Your Task Here +</button></div>
   {!taskAvailability ? (
        <div className='d-flex justify-content-center p-4'>
           <h2 className="d-flex justify-content-center p-4"> Let's Get Started test 2 </h2>
        </div>
      ) : (
        <div>
         
        <TaskList tasks={tasks} />
          </div>
      )}

<Modal
  open={open}
  onClose={handleClose}
  
  // onClose={open}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<ClickAwayListener onClickAway={handleOpen} >

  <Box sx={style} disableBackdropClick={true}>
  <IconButton
          aria-label="close"
          onClick={handleClose}
          
        >
          <CloseIcon />
        </IconButton>
<TaskModal modalOpen={setOpen} addTask={addTask}/>
  </Box>
  </ClickAwayListener>
</Modal>

   </div>
  );
}

export default MainPage;
