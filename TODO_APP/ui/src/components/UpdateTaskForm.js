import { DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import { API_URL } from '../utils';


export const UpdateTaskForm = ({fetchTasks,isDialogOpen, setisDialogOpen,task}) => {
    const {id,completed} =task;
    const[taskName,setTaskName] = useState("");
    const handleUpdateTaskName = async () =>{
        try {
            await axios.put(API_URL,{
               id,
               name:taskName,
               completed, 
            });
            await fetchTasks();
            setTaskName("");
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <dialog open={isDialogOpen}>
        <DialogTitle>Edit Task</DialogTitle>
        <div className='dialog'>
            <TextField size='small' label="Task" variant='outlined' onChange={(e)=>setTaskName(e.target.value)}/>
            <button variant="contained" onClick={async ()=>{
                await handleUpdateTaskName(); 
                setisDialogOpen(false);
                }}>
                <CheckIcon/>
            </button>
        </div>
  
    </dialog>
  )
    
}
