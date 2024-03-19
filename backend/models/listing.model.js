const mongoose = require('mongoose');
const userPal = require('./userPal.model').schema;

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  userPal: {
    type: [userPal],
    required: true
  },
  username: {
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
