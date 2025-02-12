const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User'); // Assuming you have a User model defined in models/User.js

const router = express.Router();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gameisle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Passport.js configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
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
    const user = await User.findById(id);
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
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.redirect('/login.html');
  } catch (err) {
    res.status(500).send('Error registering new user.');
  }
});

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
