const express = require('express');
const {
  getListings,
  getListing,
  createListing,
  getUserListings,
  deleteListing,
  buyListing
} = require('../controllers/listing.controller');
// const Listing = require('../models/listingModel');

const router = express.Router();

// GET all listings
router.get('/', getListings);
// GET a single listing
router.get('/:id', getListing);
// GET all user's listing
router.get('/user/:id', getUserListings);
// POST a new listing
router.post('/', createListing);
// DELETE a listing
router.delete('/:id', deleteListing);
// UPDATE a listing
// router.post('/:id', updateListing);
router.put('/buy/:id', buyListing);


module.exports = router;