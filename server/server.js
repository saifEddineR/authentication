const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
app.use(express.json());
//setup cors
const cors = require('cors');
app.use(cors());

//routes
const userRoute = require('./routes/userRoutes');
app.use('/users', userRoute);
const postRoute = require('./routes/postRoutes');
app.use('/posts', postRoute);

app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads')));

//setup for deployment :
app.use(express.static(path.join(__dirname, '../', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
});
//connecting to database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, (err) =>
  err ? console.log(err) : console.log('database connected')
);
//creating server
app.listen(process.env.PORT, (err) =>
  err ? console.error(err) : console.log('server is running on port ', process.env.PORT)
);
