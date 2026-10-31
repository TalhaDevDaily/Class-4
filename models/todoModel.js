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
