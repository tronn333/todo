const { Schema, model } = require('mongoose');
const todoSchema = new Schema({
  text: String,
  userId: String
});

const todos = model('Todos', todoSchema);
module.exports = todos;
