const express = require('express');
const {
  getListings,
  getListing,
  createListing
} = require('../controllers/listing.controller');
// const Listing = require('../models/listingModel');

const router = express.Router();

// GET all listings
router.get('/', getListings);
// GET a single listing
router.get('/:id', getListing);
// POST a new listing
router.post('/', createListing);
// DELETE a listing
// router.post('/:id', deleteListing);
// UPDATE a listing
// router.post('/:id', updateListing);


module.exports = router;