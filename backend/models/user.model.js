const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0.00
  }
});

module.exports = mongoose.model('User', userSchema);