const mongoose = require('mongoose');
const Pal = require('./pal.model').schema;
const Trait = require('./trait.model').schema;

const Schema = mongoose.Schema;

const userPalSchema = new Schema({
  username : {
    type: String,
    required: true
  },
  pal: {
    type: [Pal],
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  traits: {
    type: [Trait],
    required: true
  }
});

module.exports = mongoose.model('userPal', userPalSchema);
