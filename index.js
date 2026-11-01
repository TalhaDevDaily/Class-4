const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Task = require('./models/todoModel');

app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://TalhaDevDaily:%40R0146306c@nodejs-sandbox.zmstzzn.mongodb.net/todoDB',
  )
  .then(() => console.log(`Server has established connection with Database`))
  .catch(err => console.log(`Database connection error: ${err}`));

// Create ToDo
app.post('/tasks/create', async (req, res) => {
  const { task, priority } = req.body;

  if (!task) return res.status(400).send(`The task you are creating is empty!`);

  const create = new Task({
    task: task,
    priority: priority,
  });

  create.save();

  res.status(200).send(`Task added!`);
});

////////////////////////////////////////////////

// Middleware for Authorization
function middlewareBlockage(req, res, next) {
  if (req.headers.authorization !== 'getintoalltasks')
    return res.status(401).send(`Unauthorized access: Authentication failed`);
  next();
}

// Read ToDo
app.get('/tasks/all', middlewareBlockage, async (req, res) => {
  const readAll = await Task.find({});
  res.status(200).send(`You got ${readAll.length} left to do!
    ${readAll}`);
});

/////////////////////////////////////////////////

// Delete ToDo
app.delete('/tasks/remove/:id', async (req, res) => {
  const { id } = req.params;

  const remove = await Task.findByIdAndDelete(id);

  res.status(200).send(`${remove.task} is done!`);
});

// Update ToDo
app.post('/tasks/change/:id', async (req, res) => {
  const { id } = req.params;

  const change = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.status(200).send(`Task changed!
    ${change}`);
});

app.listen(8000, () => console.log(`Server is running`));
