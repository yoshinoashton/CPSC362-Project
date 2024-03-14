const Listing = require('../models/listing.model');
const Pal = require('../models/pal.model');
const mongoose = require('mongoose');


// GET all listings
const getListings = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
}

// GET a single listing
const getListing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such listing exists'});
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({error: 'No such listing exists'});
  }

  res.status(200).json(listing);
}

// CREATE a new listing
const createListing = async (req, res) => {
  const { pal_name, user_id, description, cost} = req.body;
  console.log(pal_name);
  try {
    // find pal
    const pal = await Pal.findOne({name: pal_name});
    // check if pal was found
    if (pal.length === 0) {
      return res.status(404).json({error: "Pal not found"});
    }

    console.log(pal);

    // add to database
    const listing = await Listing.create({ pal: pal, user_id, description, cost});
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error creating listing", error);
    res.status(400).json({ error: error.message});
  }
}

module.exports = {
  getListings,
  getListing,
  createListing
};