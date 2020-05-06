const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

dotenv.config({ path: './config.env' });
require('./db/mongoose'); // CONNECT TO DATABASE

// SETUP EXPRESS APP
const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

// FIRE UP SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is up on port ${port}`));
