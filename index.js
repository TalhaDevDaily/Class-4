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

// Create ToDo
app.post('/tasks/create', (req, res) => {
  const { task, priority } = req.body;

  if (!task)
    return res.status(400).send(`A task is required for it to be a task!`);

  const todo = new Task({
    task: task,
    priority: priority,
  });

  todo.save();

  res.status(200).send(`Task Added!: ${todo}`);
});

// Creating Middleware for reading all data
function middlewareBlockage(req, res, next) {
  // console.log(req.headers.authorization);

  if (req.headers.authorization !== 'getintoalltasks')
    return res.status(401).send(`Unauthorized access: Authentication failed`);
  next();
}

// Read ToDo
app.get('/tasks/all', middlewareBlockage, async (req, res) => {
  const readData = await Task.find({});

  res.status(200).send(`You have ${readData.length} to go!
    ${readData}`);
});

// Deleting Todo
app.delete('/tasks/remove/:id', async (req, res) => {
  const { id } = req.params;

  const remove = await Task.findByIdAndDelete(id);

  res.status(200).send(`"${remove.task}" task has been removed!`);
});

// Updating ToDo
app.post('/tasks/change/:id', async (req, res) => {
  const { id } = req.params;

  const change = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(200).send(`Task changed to: ${change}`);
});

app.listen(8000, () => console.log(`Server is running`));
