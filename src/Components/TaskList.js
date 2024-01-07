import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Search } from '@mui/icons-material';
// import SearchBar from './TaskList/SearchBar';
// import { Button } from 'bootstrap';
import { Button } from '@mui/material';
import EditModal from './EditModal';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  
  {
    id: 'task',
    numeric: false,
    disablePadding: false,
    label: 'Task',
  },
  {
    id: 'dateTime',
    numeric: true,
    disablePadding: false,
    label: 'Date and Time',
  },
  {
    id: 'priority',
    numeric: true,
    disablePadding: false,
    label: 'Priority',
  }
];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Task Summary
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

function SearchBar({ onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default function EnhancedTable( {tasks, setTasks, deleteTask} ) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState(''); // Step 1: Add state for search query


  // const [tasks, setTasks] = useState([]);

  // const handleEditModalOpen = (taskId) => {
  //   setIsEditModalOpen(true);
  // };
  const handleSearchChange = (query) => {
    setPage(0); // Reset page when search query changes
    setSearchQuery(query); // Update search query state
  };


//   const handleDelete = (taskId) => {
//     // Use filter to create a new array excluding the task with the specified ID
// const updatedTasks = tasks.filter((task) => task.id !== taskId);

// // Update the tasks array using setTasks
// setTasks(updatedTasks);

// // You may also want to update the local storage
// localStorage.setItem('tasks', JSON.stringify(updatedTasks));
// const data = JSON.stringify(localStorage.getItem(taskId));

// localStorage.removeItem(taskId);
//   console.log('Delete clicked for task ID:', taskId);
// };

  
  const handleEdit = (taskId) => {
    // taskId = tasks.id;
    // Implement your logic for handling edit button click
    
    setIsEditModalOpen(true);
    setSelectedTask(taskId);
    console.log('Edit clicked for task ID:', taskId);

  };

      // Callback function to handle the updated task data
  const handleSaveEdit = (updatedTask) => {
    // Find the task with the same ID in the tasks array
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    // Update the tasks array using setTasks
    setTasks(updatedTasks);

    console.log('Updated Tasks:', updatedTasks);

    // Close the modal
    handleClose();
  };

  


  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n) => n.id);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const addTask = (taskData) => {
  //   setTasks((prevTasks) => [...prevTasks, taskData]);
  // };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(tasks, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     ),
  //   [order, orderBy, page, rowsPerPage],
  // );

  const handleClose = () => {
    setIsEditModalOpen(false);
  };


  
  

  return (
   <div>
    <br></br>
     <div className='d-flex justify-content-end px-4 pb-2'><SearchBar onSearchChange={handleSearchChange}/></div>

     <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            {/* <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={tasks.length}
            /> */}
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
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>

                    // <TableCell
                    //   component="th"
                    //   id={labelId}
                    //   scope="row"
                    //   padding="none"
                    // >
                    //   {row.task}
                    // 
                    
                    </TableCell> */}
                    <TableCell align="right">{task.id}</TableCell>
                    <TableCell align="right">{task.taskName}</TableCell>
                    <TableCell align="right">{task.dateTime && task.dateTime.toString()}</TableCell>
                    <TableCell align="right">{task.priority}</TableCell>
                    {/* <TableCell align="right">Actions</TableCell> */}
                    <TableCell align="right">
          <Button variant="contained" color="primary" onClick={() => handleEdit(task)}>
            Edit
          </Button>
        
        </TableCell>
        <TableCell align='right'>
        <Button  color="secondary" onClick={() => deleteTask(task.id)}>
            Delete
          </Button>
        </TableCell>
                    
                  </TableRow>
                  // ))}
                );
              })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>

    <Modal
  open={isEditModalOpen}
  onClose={handleClose}
  
  // onClose={open}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
{/* <ClickAwayListener onClickAway={handleOpen} > */}

  <Box sx={style} disableBackdropClick={true}>
  <IconButton
          aria-label="close"
          onClick={handleClose}
          
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