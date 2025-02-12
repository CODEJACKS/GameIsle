const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

// Predefined list of users
const predefinedUsers = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Passport.js configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = predefinedUsers.find(user => user.username === username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = password === user.password;
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = predefinedUsers.find(user => user.id === id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware for checking if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login.html');
}

// Routes
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile.html',
  failureRedirect: '/login.html',
  failureFlash: true,
}));

router.get('/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../profile.html'));
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
