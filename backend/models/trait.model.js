const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const traitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  effect: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Trait', traitSchema);
