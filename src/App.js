import React from 'react';
import Tasks from './components/Tasks';
import {useState} from 'react';
import AddTask from './components/AddTask';
import {Typography, Grid, Button} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';



const App = () => {

  const [addShown, setAddShown]= useState(false);

  const [tasks, setTasks]= useState(
     [
       { id:1, name: 'Shopping', date: '2023-02-15', reminder: false , priority: false, info: 'Buy a new dress for HB celebrating'}, 
       { id:2, name: 'Homework', date: '2023-02-16', reminder: false , priority: true}, 
       { id:3, name: 'Essey', date: '2023-03-20', reminder: true, priority: true , info: 'The impact of Franc Kafka on society'}
     ]
  )

    const deleteTask=(id)=> {
       setTasks(tasks.filter(task => task.id !==id));
    };

   const addTask=(task)=> {
       let id = Math.floor(Math.random()* 40 )+ 5;
       let newTask={id, ...task};
       console.log(id, task);
       setTasks( [...tasks, newTask]);
    };

   const editTask=(id, newName, newDate)=> {
       let newList = tasks.map((task)=>{
         if(id===task.id){
           return {...task, name: newName, date: newDate};
         } return task;
       });
       setTasks(newList);
    };
    
   const changeReminder=(id)=> {
     let newList= tasks.map((task)=>{
       if(id===task.id){
         return {...task, reminder: !task.reminder};
       } return task;
     });
     setTasks(newList);
   };

 

  return (
    <>
      <Grid container spacing={2} justifyContent='center'>
          <Typography id='header' color='#222222'> ToDo App</Typography>
          <DoneAllIcon id='logo'/>
      </Grid>
      <Grid >
          {tasks.length >0 ? (<Tasks tasks={tasks} deleteTask={deleteTask} editTask={editTask} changeReminder={changeReminder}/> )
                        : (<Typography  align ='center' margin='100px 20px 50px' id='noTask'>No task to do :( </Typography> )}
          <Button id='button-add' aria-details='New task dialog button' onClick={() => {
              setAddShown(current=> !current)}}>
              {addShown ? <CloseIcon/> : <AddIcon/>}
          </Button>
          {addShown? <AddTask addTask={addTask}/> : null}
      </Grid>
    </>
  )
}

export default App