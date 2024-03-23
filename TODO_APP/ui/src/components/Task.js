import { Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateTaskForm } from './UpdateTaskForm';
import classnames from 'classnames';
import axios from "axios";
import { API_URL } from '../utils';


export const Task = ({task,fetchTasks}) => {
    const {id,name,completed} = task;
    const[isComplete,setisComplete] = useState(completed);
    const[isDialogOpen,setisDialogOpen] = useState(false);
    
    const handleUpdateTaskCompletion = async ()=>{
        try {
            await axios.put(API_URL,{
                id,
                name,
                completed:!isComplete,
            });
            setisComplete((prev)=>!prev);

        } catch (error) {
            console.log(error);
        }
    }
    const handleDeletetask = async ()=>{
        try {
            await axios.delete(`${API_URL}/${task.id}`);
            await fetchTasks();
        } catch (error) {
            console.log(error);

        }
    }
  return (
    <div className='task'>
        <div className={classnames("flex",{done:isComplete,})}>
            <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion}/>
            <Typography variant='h4'>{name}</Typography>
        </div>
        <div className='taskButtons'>
            <button variant="contained" onClick={()=>setisDialogOpen(true)}>
                <EditIcon/>
            </button>
            <button color="error" variant="contained" onClick={handleDeletetask}>
                <DeleteIcon/>
            </button>
        </div>
        
        <UpdateTaskForm fetchTasks={fetchTasks} isDialogOpen={isDialogOpen} setisDialogOpen={setisDialogOpen} task={task}/>
    </div>
  )
}
