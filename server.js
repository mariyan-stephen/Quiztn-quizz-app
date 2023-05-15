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
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.one('SELECT id, username, password FROM users WHERE username = $1', [username])
      .then(user => {
        bcrypt.compare(password, user.password, (err, res) => {
          if(res) {
            // Passwords match
            return done(null, user);
          } else {
            // Passwords don't match
            return done(null, false, { message: 'Incorrect password.' });
          }
        })
      })
      .catch(err => done(err));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.one('SELECT id, username FROM users WHERE id = $1', [id])
    .then(user => done(null, user))
    .catch(err => done(err));
});

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      res.send(err);
    } else {
      db.none('INSERT INTO users(username, password) VALUES($1, $2)', [req.body.username, hashedPassword])
        .then(() => res.redirect('/login'))
        .catch(err => res.send(err));
    }
  });
});

app.post('/login', passport.authenticate('local', { 
  successRedirect: '/', 
  failureRedirect: '/login' 
}));

app.get('/', (req, res) => {
  if(req.user) {
    res.send(`Hello, ${req.user.username}!`);
  } else {
    res.send('Hello World!');
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
