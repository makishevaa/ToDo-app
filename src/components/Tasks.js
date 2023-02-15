import {useState} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {Typography, CardContent, Card, Divider, Popper, InputLabel, TextField,CardActions, Button, Grid, Input} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';



const Tasks = ({tasks, deleteTask, changeReminder, editTask}) => {

    const [editShown, setEditShown]= useState(false);
    const [newName, setNewName]= useState('');
    const [newDate, setNewDate]= useState('');
    const [editId, setEditId]= useState('');

    const [parent, enableAnimations] = useAutoAnimate();

    // set anchors for popper
    const [anchorE, setAnchorE] = useState(null);
    const openE = Boolean(anchorE);

    const [alerted, setAlerted]= useState(false);

    const [showInfo, setShowInfo]= useState(false);
    const [anchorI, setAnchorI] = useState(null);
    const openI = Boolean(anchorI);
    const [info, setInfo]= useState('');


    // Function for deadline check 
    const checkTime=(tasks)=>{
        tasks.forEach((item)=>{
            let numdate= Date.parse(item.date);
            let numnow=Date.parse(new Date().toISOString().split('T')[0]);
            if (numdate==numnow && item.reminder && !alerted){
                setAlerted(true);
                alert(`Today is deadline for: ${item.name}!`);
        }}); 
    };

    checkTime(tasks);


  return (
    <>
        
            <Grid  id ='tasks-board' container spacing={2} item xs={12} ref={parent}  justifyContent="center" >
            {tasks.map((task)=>(
                <>
                    <Card id='tasks-card' align='center' justifyContent='center' aria-details='Task card'>
                        <CircleIcon id='circle'/>
                        <CardContent id='tasks-item'>
                             <Typography id='tasks-card-name' color='#222222'>{task.name}</Typography>
                             {task.priority? <StarIcon id='staricon'/> : null}
                            <Typography id='tasks-card-date' color='#222222'>  {task.date}</Typography>
                        </CardContent>
                    <Divider/>
                        <CardActions id='card-buttons' style={{justifyContent:'center'}} >
                            <Button  id='button-delete' aria-details='Delete button' onClick={() => 
                                deleteTask(task.id)} >
                                <DeleteIcon id='icon-delete'/>
                            </Button>
                            <Button  id='button-edit' aria-details='Edit button' onClick={(e)=> {
                                setShowInfo(false);
                                setEditShown(true);
                                setAnchorE(anchorE ? null : e.currentTarget)
                                setEditId(task.id)}}><EditIcon id='icon-edit'/>
                            </Button>
                            <Button  id='button-notif' aria-details='Change notigication mode' onClick={() => changeReminder(task.id , task.reminder)}> 
                                { task.reminder ? (<NotificationsOffIcon id='icon-notifOff'/>) : (<NotificationsActiveIcon id='icon-notifOn'/>)}
                            </Button> 
                            <Button id='button-info' aria-details='Info button' onClick={(e)=>{
                                setEditShown(false);
                                setInfo(task.info);
                                setShowInfo(true);
                                setAnchorI(anchorI ? null : e.currentTarget);  
                            }}><InfoIcon id='icon-info'/></Button>
                        </CardActions> 
                     </Card>
                </>
            ))}
            </Grid>
        


        {showInfo ?
            <Popper open={openI} anchorEl={anchorI} sx={{border:'1px solid #a07039', backgroundColor:'#ead6bf', padding:'10px', borderRadius:'5px'}}>
                <Typography id='popper-info'> { info ? info : 'There is no details for this task'}</Typography>
            </Popper>
        : null
        }



        {editShown ? 
            <Popper id='edit-popper' open={openE} anchorEl={anchorE} sx={{border:'1px solid #a07039', backgroundColor:'antiquewhite', padding:'10px', borderRadius:'5px'}}>
                <Grid id='edit-grid' container direction="column" justifyContent="center" alignItems="center" >
                    <Typography color='#222222' variant='h6' margin='5px'>Edit Task</Typography>
                    <InputLabel htmlFor='popper-name-input'>Name</InputLabel>
                    <TextField label= 'Enter new name' required id='popper-name-input' aria-placeholder='Enter new name' aria-required
                        value={newName} onChange={(e)=> 
                        setNewName(e.target.value.charAt(0).toUpperCase()+ e.target.value.slice(1))}>
                    </TextField>
                    <InputLabel htmlFor='popper-date-input'>Date</InputLabel>
                    <Input type='date' id= 'popper-date-input' aria-details='Choose date' aria-required 
                        value={newDate} onChange={(e)=> 
                        setNewDate(e.target.value)}>
                    </Input>
                    <Button  id='popper-submit-button'onClick={(e)=>{
                        e.preventDefault();
                        if (!newDate || !newName){
                            alert('Input error! Please check your choice.')
                        }else editTask(editId, newName, newDate)
                        setEditShown(false)}
                        }>Submit</Button>
                    <Button id='popper-cancel-button' onClick={() => setEditShown(false)}>Cancel</Button>
                </Grid>    
            </Popper>
        : null}


    </>
  );
};

export default Tasks