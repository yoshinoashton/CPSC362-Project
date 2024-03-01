const mongoose = require('mongoose');
const Pal = require('./pal.model').schema;

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  pal: {
    type: [Pal],
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
