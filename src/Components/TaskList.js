import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
// import SearchBar from './TaskList/SearchBar';
// import { Button } from 'bootstrap';
import { Button } from '@mui/material';
import EditModal from './EditModal';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// const headCells = [

//   {
//     id: 'task',
//     numeric: false,
//     disablePadding: false,
//     label: 'Task',
//   },
//   {
//     id: 'dateTime',
//     numeric: true,
//     disablePadding: false,
//     label: 'Date and Time',
//   },
//   {
//     id: 'priority',
//     numeric: true,
//     disablePadding: false,
//     label: 'Priority',
//   }
// ];



function SearchBar({ onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default function EnhancedTable({ tasks, setTasks, deleteTask }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');


  const handleEdit = (taskId) => {


    setIsEditModalOpen(true);
    setSelectedTask(taskId);
    console.log('Edit clicked for task ID:', taskId);

  };

  const handleSaveEdit = (updatedTask) => {

    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);

    console.log('Updated Tasks:', updatedTasks);
    handleClose();
  };



  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <br></br>
      {/* <div className='d-flex justify-content-end px-4 pb-2'><SearchBar onSearchChange={handleSearchChange} /></div> */}

      <Box sx={{ width: '900px', paddingLeft:'20%' }}>
        <Paper sx={{ width: '900px', mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 900 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >

              <TableBody>
                {tasks.map((task, index) => {
                  const isItemSelected = isSelected(task.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    // {tasks.map((task, index) => (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, task.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >

                      {/* <TableCell align="right">{task.id}</TableCell> */}
                      <TableCell align="right">{task.taskName}</TableCell>
                      {/* <TableCell align="right">{task.dateTime.toString()}</TableCell> */}
                      <TableCell align='right'>{dayjs(task.dateTime).format('YYYY-MM-DD HH:mm')}</TableCell>
                      <TableCell align="right">{task.priority}</TableCell>

                      <TableCell align="right">
                        <Button variant="contained" sx={{backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)', width:'100px'}} onClick={() => handleEdit(task)}>
                          Edit
                        </Button>

                      </TableCell>
                      <TableCell align='right'>
                        <Button variant="contained" sx={{backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)', width:'100px'}}  onClick={() => deleteTask(task.id)}>
                          Delete
                        </Button>
                      </TableCell>

                    </TableRow>
                    // ))}
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

      </Box>

      <Modal
        open={isEditModalOpen}
        onClose={handleClose}

        // onClose={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >


        <Box sx={styles.styling} disableBackdropClick={true}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className="d-flex justify-content-end"
          >
            <CloseIcon />
          </IconButton>
          {/* <TaskModal modalOpen={setOpen} addTask={addTask} setTaskAvailability={setTaskAvailability}/> */}
          <EditModal taskDetails={selectedTask} onSave={handleSaveEdit} editModalOpen={isEditModalOpen} onClose={handleClose} />
        </Box>
        {/* </ClickAwayListener> */}
      </Modal>

    </div>
  );
}

const styles = {
  styling : {
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
  
}