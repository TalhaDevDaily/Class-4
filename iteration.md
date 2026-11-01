/\*
//////////////////////////////////////
// index.js

const express = require('express');
const app = express();

// installing mongoose
const mongoose = require('mongoose');
const Task = require('./models/todoModel');

app.use(express.json());

// mongodb+srv://TalhaDevDaily:@R0146306c@nodejs-sandbox.zmstzzn.mongodb.net/todoDB
// @ - %40

mongoose
.connect(
'mongodb+srv://TalhaDevDaily:%40R0146306c@nodejs-sandbox.zmstzzn.mongodb.net/todoDB',
)
.then(() => console.log('Connection established with Database!'))
.catch(err => console.log(`The server ran into an error: ${err}`));

// Create ToDo Tasks
app.post('/task/create', (req, res) => {
const { task, priority } = req.body;

if (!task) {
return res.status(401).send(`Can't add empty Task`);
}

const todo = new Task({
task: task,
priority: priority,
});

todo.save();

res.send(todo);

// res.status(200).send(`Task added!`);
});

// Read Todo Tasks
// Middleware gives the authorization for to access certain data by authentication
function authorizationMiddleware(req, res, next) {
// console.log(req.headers.authorization);
if (req.headers.authorization === 'getintoalltasks') next();
else
res
.status(401)
.send(
`Unauthorized Access: You do not have the permission to access the Tasks`,
);
}

app.get('/tasks/all', authorizationMiddleware, async (req, res) => {
const data = await Task.find({});

res.send(data);
});

// Delete ToDo Tasks
app.delete('/tasks/remove/:id', async (req, res) => {
const { id } = req.params;

await Task.findByIdAndDelete(id);

res.send(`Task Removed!`);
});

// Update ToDo Tasks
app.post('/tasks/change/:id', async (req, res) => {
const { id } = req.params;
const update = await Task.findByIdAndUpdate({ \_id: id }, req.body, {
new: true,
});
res.send(`Task has been updated to:
    ${update}`);
});

app.listen(8000, () => console.log(`Server is running`));

\*/

/\*

//////////////////////////////////////
// ./models/todoModels.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
task: {
type: String,
required: true,
},
priority: {
type: String,
enum: ['high', 'moderate', 'low', 'none'], // enumeration
default: 'none',
},
});

module.exports = mongoose.model('Task', todoSchema);

\*/
