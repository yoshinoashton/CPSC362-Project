const Listing = require('../models/listing.model');
const UserPal = require('../models/userPal.model');
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

// GET a user's listings
const getUserListings = async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.find({username: id});
  res.status(200).json(listings);
}

// CREATE a new listing -- NEEDS USER AUTH
const createListing = async (req, res) => {
  const { userPal_id, username, description, cost} = req.body;
  try {
    // find pal
    const userPal = await UserPal.findById(userPal_id);
    // check if pal was found
    if (!userPal) {
      return res.status(404).json({error: "User Pal not found"});
    }

    console.log(userPal);

    // add to database
    const listing = await Listing.create({ userPal: userPal, username, description, cost});
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error creating listing", error);
    res.status(400).json({ error: error.message});
  }
}

// DELETE listing -- NEEDS USER AUTH

module.exports = {
  getListings,
  getListing,
  getUserListings,
  createListing
};