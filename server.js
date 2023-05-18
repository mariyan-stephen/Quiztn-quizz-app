require('dotenv').config();

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
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Passport setup code
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.one('SELECT * FROM users WHERE username = $1', [username])
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return done(err);
          }
          if (!result) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      })
      .catch(err => done(err));
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Registration route
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error registering user');
      return;
    }

    // Log the user data right before making the query
    console.log('Registering user:', { username, password, email });

    // Insert the new user into the database
    db.none('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email])
      .then(() => {
        res.send(`User ${username} registered successfully`);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error registering user');
      });
  });
});



// Login route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

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
  // Get the game ID from the URL
  const gameId = req.params.id;
  
  // Get the user ID from the session
  const userId = req.user.id;
  
  // Add the user to the game
  db.none('INSERT INTO game_participants (game_id, user_id) VALUES ($1, $2)', [gameId, userId])
    .then(() => {
      res.send(`User ${userId} joined game ${gameId}`);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error joining game');
    });
});

app.post('/games/:id/answer', (req, res) => {
  // This endpoint should accept a user's answer for the current question
  // For now, let's just send a placeholder response
  res.send(`Answer received for game ${req.params.id}!`);
});

app.get('/games/:id', (req, res) => {
  // This endpoint should return the current state of a game
  // For now, let's just send a placeholder response
  res.send(`Game state for game ${req.params.id}!`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
