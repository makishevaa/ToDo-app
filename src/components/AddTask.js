import {useState} from 'react';
import { FormControlLabel, Checkbox, TextField, Button,  FormControl, Input} from '@mui/material';


const AddTask = ({addTask}) => {
    const [name, setName]= useState('');
    const [date, setDate]= useState('');
    const [reminder, setReminder]= useState(false);
    const [priority, setPriority]= useState(false);
    const [infoCheck, setInfoCheck]= useState(false);
    const [info, setInfo]= useState('');



  return (
    <>
       
        <FormControl id='form-add'>
        <TextField id='taskName-input' label= 'Enter task name' required aria-placeholder='Enter name' aria-required
                    value={name} onChange={(e)=> 
                    setName(e.target.value.charAt(0).toUpperCase()+ e.target.value.slice(1))}>
            </TextField>
            <Input id='taskDate-input'  type='date' label= 'Choose date' aria-details='Choose date' aria-required
                    value={date} onChange={(e)=> 
                    setDate(e.target.value)}>
            </Input>
            <FormControlLabel  control={<Checkbox aria-details='Reminder checkbox'/>} label='Reminder'
                    value={reminder} onClick={(e)=>
                    setReminder(e.target.checked)}>
            </FormControlLabel>
            <FormControlLabel  control={<Checkbox aria-details='Priority checkbox'/>} label='Priority'
                    value={priority} onClick={(e)=>
                    setPriority(e.target.checked)}>
            </FormControlLabel>
            <FormControlLabel  control={<Checkbox aria-details='Additional info checkbox'/>} label='Add details'
                    onClick={()=>
                    setInfoCheck(true)}>
            </FormControlLabel>
            {
                infoCheck ?
                <TextField id='taskInfo-input' label= 'Enter task details' aria-placeholder='Enter details'
                    value={info} onChange={(e)=> 
                    setInfo(e.target.value.charAt(0).toUpperCase()+ e.target.value.slice(1))}>
                </TextField>

                : null
            }
            <Button id='form-add-button'aria-details='Add new task button' onClick={(e)=> {
                e.preventDefault(); 
                if (!name || !date){
                    alert('Input error! Please check your choice.')
                } else addTask({name, date, reminder, priority, info})
                setName('');
                setDate('');
                setReminder(false);
                setPriority(false);
            }}>Add</Button>
        </FormControl>
    </>
  )
}

export default AddTask