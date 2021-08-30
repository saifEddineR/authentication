const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

//routes
const userRoute = require('./routes/userRoutes');
app.use('/users', userRoute);
const postRoute = require('./routes/postRoutes');
app.use('/posts', postRoute);

//connecting to database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, (err) =>
  err ? console.log(err) : console.log('database connected')
);
//creating server
app.listen(process.env.PORT, (err) =>
  err ? console.error(err) : console.log('server is running on port ', process.env.PORT)
);
