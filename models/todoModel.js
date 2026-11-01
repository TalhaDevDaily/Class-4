const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['none', 'low', 'moderate', 'high'],
    default: 'none',
  },
});

module.exports = mongoose.model('Task', todoSchema);
