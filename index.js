const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Task = require('./models/todoModel');

app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://TalhaDevDaily:%40R0146306c@nodejs-sandbox.zmstzzn.mongodb.net/todoDB',
  )
  .then(() =>
    console.log(`Server established connection with Database successfully!`),
  )
  .catch(err => console.log(`Unable to link to server: ${err}`));

app.post('/tasks/create', (req, res) => {
  const { task, priority } = req.body;

  if (!task)
    return res.status(400).send(`A task is required for it to be a task!`);

  const todo = new Task({
    task: task,
    priority: priority,
  });

  res.status(200).send(`Task Added!: ${req.body.task}`);
});

app.listen(8000, () => console.log(`Server is running`));
