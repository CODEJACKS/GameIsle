const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favoriteGames: {
    type: [String],
    default: []
  },
  highScores: {
    type: [{
      game: String,
      score: Number
    }],
    default: []
  },
  achievements: {
    type: [String],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
