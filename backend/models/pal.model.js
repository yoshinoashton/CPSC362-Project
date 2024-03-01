const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const palSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Pal', palSchema);
