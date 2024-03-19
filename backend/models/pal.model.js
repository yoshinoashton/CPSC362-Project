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
  },
  partnerSkill: {
    name: String,
    description: String
  },
  skills: [{
    name: String,
    type: String,
    min_level: Number
  }],
  workSuitability: [{
    name: String,
    level: Number,
  }]

});

module.exports = mongoose.model('Pal', palSchema);
