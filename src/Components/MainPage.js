
import * as React from 'react';
import TaskModal from './TaskModal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ClickAwayListener } from '@mui/material';
import { useState, useEffect } from 'react';
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
  const [taskAvailability, setTaskAvailability] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Retrieve tasks from localStorage on mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
   
  }, []);

  console.log(tasks,'menna stored tasks');

  const addTask = (newTask) => {
    // setTasks([...tasks, task]);

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Store updated tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  
  const deleteTask = (taskId) => {
    // Filter out the task with the specified ID
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    // Update the tasks state
    setTasks(updatedTasks);

    // Update local storage
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
   <div>
   <figure className="text-center">
  <blockquote className="blockquote pt-4">
    <h2>To Do Application</h2>
  </blockquote>
  <figcaption className="blockquote-footer">
    Let us <cite title="Source Title">Bind Your Time</cite>
  </figcaption>
</figure>
   {/* <h2 className="d-flex justify-content-center p-4"> Let's Get Started</h2> */}
   <div  className='d-flex justify-content-center p-4' ><button onClick={handleOpen}  type="button" class="btn btn-primary">Add Your Task Here +</button></div>
   {!taskAvailability ? (
        <div className='d-flex justify-content-center p-4'>
           <h2 className="d-flex justify-content-center p-4"> Let's Get Started </h2>
        </div>
      ) : (
        <div>
         
        <TaskList tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} />
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
<TaskModal modalOpen={setOpen} addTask={addTask} setTaskAvailability={setTaskAvailability}/>
  </Box>
  </ClickAwayListener>
</Modal>

   </div>
  );
}

export default MainPage;
