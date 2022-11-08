const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const notesRoute = require('./routes/notesRoute');
const mongoose = require('mongoose');

dotenv.config();

//Connect to MongoDB...
mongoose.connect(process.env.DB_CONNCT,
	()=> {
		console.log('Connected to our DB');
	});


//MiddleWare
app.use(express.json());

//Route Middlewares....
app.use('/api/user', authRoute);

app.use('/api/posts', postRoute);

app.use('/api/notes', notesRoute);


app.get('/', (req, res) => {
  res.send('Welcome to My Site....');
});










app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});