
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const todosRouter = require('./routes/todosRouter')
const app = express();


app.use(logger('dev'))
app.use(express.json())
app.use(cors())

app.use('/', userRouter)

// const dbPath = 'mongodb://127.0.0.1:27017/todos';
// const dbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   family: 4,
// };

app.listen(3001, () => {
  console.log('Server start');
});
