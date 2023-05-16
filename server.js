const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./database');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Use sessions for tracking logins
app.use(session({
  secret: 'Your session secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// ... Passport setup code ...

// ... Registration and login routes ...

app.post('/games', (req, res) => {
  db.one('INSERT INTO games DEFAULT VALUES RETURNING id')
    .then(data => {
      res.json({ gameId: data.id });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating game');
    });
});

app.post('/games/:id/join', (req, res) => {
  // Add functionality here
});

app.post('/games/:id/answer', (req, res) => {
  // Add functionality here
});

app.get('/games/:id', (req, res) => {
  // Add functionality here
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
