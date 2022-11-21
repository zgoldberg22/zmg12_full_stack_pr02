import React, { useState } from 'react';
import './style.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircle from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Low',
    isComplete: false,
  });
  const [validations, setValidations] = useState({
    title: false,
    description: false,
  });
  const [titleValidText, setTitleValidText] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [showTitle, setShowTitle] = useState(true);
  const [currIndex, setCurrIndex] = useState(-1);

  const addSuccess = () => toast.success('Added task successfully!');
  const deleteSuccess = () => toast.success('Deleted task successfully!');
  const updateSuccess = () => toast.success('Updated task successfully!');

  function handleSubmit() {
    validateTask();
  }

  function handleClose() {
    setOpen(false);
    setValidations({
      title: false,
      description: false,
    });
    setTitleValidText('');
  }

  function handleOpen() {
    setTitleValidText('');
    setShowTitle(true);
    setOpen(true);
  }

  function titleIsUnique() {
    // if (task.title === '') {
    //   setTitleValidText('Title is required!');
    //   return false;
    // }
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].title === task.title) {
        // setValidations({ ...validations, task: true });
        setTitleValidText('Title must be unique!');
        return false;
      }
    }

    return true;
  }

  function validateTask() {
    if (task.title !== '' && titleIsUnique() && task.description !== '') {
      //after validated:
      setAllTasks((allTasks) => [...allTasks, task]);
      //reset task object
      setTask({
        title: '',
        description: '',
        deadline: '',
        priority: 'Low',
      });
      setValidations({
        title: false,
        description: false,
      });
      setOpen(false);
      addSuccess();
    } else {
      console.log(task.title === '' || !titleIsUnique());
      setValidations({
        title: task.title === '' || !titleIsUnique(),
        description: task.description === '',
      });
      if (task.title === '') {
        setTitleValidText('Title is required!');
      }
    }
  }

  function validateUpdate() {
    let newArr = [...allTasks];
    let theTask = newArr[currIndex];
    if (
      task.description !== '' &&
      task.deadline !== '' &&
      task.priority !== ''
    ) {
      //after validated:
      newArr[currIndex] = {
        title: theTask.title,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        isComplete: false,
      };
      setAllTasks(newArr);
      //reset task object
      setTask({
        ...task,
        description: '',
        deadline: '',
        priority: 'Low',
      });
      setValidations({
        ...validations,
        description: false,
      });
      setOpen(false);
      setCurrIndex(-1); //reset index
      updateSuccess();
    } else {
      setValidations({
        ...validations,
        description: task.description === '',
      });
    }
  }

  const handleFieldChange = (e) => {
    // console.log(e);
    if (e.target.name == 'deadline') {
      setTask({
        ...task,
        deadline: e.target.value,
      });
    } else {
      setTask({
        ...task,
        [e.target.name]: e.target.value,
      });
    }
  };

  const checkedTask = (index) => (e) => {
    // console.log(index);
    // console.log(e);
    let newArr = [...allTasks];
    let theTask = newArr[index];
    console.log(theTask);
    let complete = theTask.isComplete;
    console.log(complete);
    newArr[index] = {
      title: theTask.title,
      description: theTask.description,
      deadline: theTask.deadline,
      priority: theTask.priority,
      isComplete: !complete,
    };
    setAllTasks(newArr);
  };

  const handleOpenUpdate = (index) => (e) => {
    setShowTitle(false);
    let newArr = [...allTasks];
    let theTask = newArr[index];
    setTask(theTask);
    console.log(theTask);
    // setTask({ t });
    setOpen(true);
    setCurrIndex(index);
  };

  function deleteTask(index) {
    let newArr = [...allTasks];
    console.log(newArr);
    newArr.splice(index, 1);
    setAllTasks(newArr);
    deleteSuccess();
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MenuIcon id="menuIcon" />
            <Typography
              id="frameworksHeader"
              variant="button"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              FRAMEWORKS
            </Typography>
            <Button
              id="add-btn"
              variant="contained"
              startIcon={<AddCircle />}
              size="small"
              color="primary"
              onClick={handleOpen}
            >
              Add
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        {showTitle ? (
          <DialogTitle color="white" sx={{ bgcolor: 'primary.dark' }}>
            <AddCircle />
            Add Task
          </DialogTitle>
        ) : (
          <DialogTitle color="white" sx={{ bgcolor: 'primary.dark' }}>
            <EditIcon />
            Edit Task
          </DialogTitle>
        )}

        <DialogContent sx={{ marginY: '15px' }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {showTitle && (
              <TextField
                error={validations.title}
                helperText={titleValidText}
                label="Title"
                type="text"
                fullWidth
                name="title"
                // onChange={(e) => setTask({ ...task, title: e.target.value })}
                onChange={handleFieldChange}
              />
            )}

            <TextField
              error={validations.description}
              helperText={
                validations.description ? 'Description is required!' : ''
              }
              id="outlined-search"
              label="Description"
              type="text"
              value={task.description}
              name="description"
              fullWidth
              onChange={handleFieldChange}
            />
            <TextField
              // error={validations.deadline}
              // helperText={validations.deadline ? 'Deadline is required!' : ''}
              id="date"
              label="Deadline"
              type="date"
              value={task.deadline}
              name="deadline"
              sx={{ width: 275 }}
              InputLabelProps={{
                shrink: true,
              }}
              // onChange={(e) => setTask({ ...task, deadline: e.target.value })}
              onChange={handleFieldChange}
            />

            <FormControl
              // onChange={(e) => setTask({ ...task, priority: e.target.value })}
              onChange={handleFieldChange}
            >
              <FormLabel>Priority</FormLabel>
              <RadioGroup name="radio-buttons" row defaultValue="low">
                <FormControlLabel control={<Radio />} label="Low" value="low" />
                <FormControlLabel control={<Radio />} label="Med" value="med" />
                <FormControlLabel
                  control={<Radio />}
                  label="High"
                  value="high"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          {showTitle ? (
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              startIcon={<AddCircle />}
            >
              Add
            </Button>
          ) : (
            <Button
              onClick={validateUpdate}
              color="primary"
              variant="contained"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          )}
          <Button
            onClick={handleClose}
            color="warning"
            variant="contained"
            startIcon={<DoDisturbIcon />}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer>
        <Table sx={{ minWidth: 550 }}>
          <TableHead id="table-heading">
            <TableRow>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Deadline</strong>
              </TableCell>
              <TableCell>
                <strong>Priority</strong>
              </TableCell>
              <TableCell>
                <strong>Is Complete</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTasks.map((t, index) => (
              <TableRow key={t.title}>
                <TableCell>{t.title}</TableCell>
                <TableCell align="center">{t.description}</TableCell>
                <TableCell align="center">
                  {t.deadline === ''
                    ? ''
                    : moment(t.deadline).format('MM/DD/YYYY')}
                </TableCell>
                <TableCell align="center">{t.priority}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    size="small"
                    name="check_completed"
                    onChange={checkedTask(index)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="column">
                    {/* might need to add another prop for isComplete because can't pass props from child to parent */}
                    {!t.isComplete && (
                      <Button
                        id="update-btn"
                        variant="contained"
                        size="small"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={handleOpenUpdate(index)}
                      >
                        Update
                      </Button>
                    )}
                    <Button
                      size="small"
                      color="warning"
                      variant="contained"
                      startIcon={<HighlightOffIcon />}
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* add props to TaskTable so that can pass in the allTasks state so can render multiple rows */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressionBar={false}
        newestOnTop={false}
        pauseOnHover={false}
        rtl={false}
      />
    </div>
  );
};

export default App;

//https://mui.com/material-ui/react-text-field/
