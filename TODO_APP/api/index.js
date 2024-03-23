
import express from 'express';
import { fetchTasks, createTasks, updateTasks, deleteTasks } from './task.js';
import Serverless from 'serverless-http';
import cors from "cors";

const app = express()
const port = 3001
app.use(express.json())

if(process.env.DEVELOPMENT){
    app.use(cors())
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/task', async(req, res) => {
    try {
        const tasks = await fetchTasks();
        res.send(tasks.Items)
    } catch (error) {
        res.status(400).send(`Error fetching tasks: ${error}`);
    }
})

app.post('/task', async(req, res) => {
    try {
        const task = req.body;
        const response = await createTasks(task);
        res.send(response)
    } catch (error) {
        res.status(400).send(`Error creating tasks: ${error}`);
    }
})

app.put('/task', async(req, res) => {
    try {
        const task = req.body;
        const response = await updateTasks(task);
        res.send(response)
    } catch (error) {
        res.status(400).send(`Error updating tasks: ${error}`);
    }
})

app.delete('/task/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const response = await deleteTasks(id);
        res.send(tasks.Items)
    } catch (error) {
        res.status(400).send(`Error deleting tasks: ${error}`);
    }
})


if(process.env.DEVELOPMENT){
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}

export const handler = Serverless(app);