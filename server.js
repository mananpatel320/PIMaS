const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongooose = require('mongoose');
const path = require('path');

const users = require('./routes/api/users');
const pr = require('./routes/api/pr');

const app = express();

//BodyParser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//Connect to MongoDB
const db = require('./config/keys').mongoURI;

mongooose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected.'))
  .catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/pr', pr);

//Serve static assets if in production
if (process.env.NODE_ENV == 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000; //process.env.port for Heroku

app.listen(port, () =>
  console.log(`Server up and running on the port ${port}!`)
);
