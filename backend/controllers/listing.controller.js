const Listing = require('../models/listing.model');
const UserPal = require('../models/userPal.model');
const User = require('../models/user.model');
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

// CREATE a new listing
const createListing = async (req, res) => {
  console.log('working');
  const { userPal_id, description, cost} = req.body;
  try {
    // find pal
    const userPal = await UserPal.findById(userPal_id);
    // check if pal was found
    if (!userPal) {
      return res.status(404).json({error: "User Pal not found"});
    }

    const exists = await Listing.find( {'userPal._id': userPal_id});
    if (exists._id) {
      return res.status(404).json({error: "pal exists"});
    }

    // add to database
    const listing = await Listing.create({ userPal: userPal, username: userPal.username, description, cost});
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error creating listing", error);
    res.status(400).json({ error: error.message});
  }
}

// DELETE listing
const deleteListing = async(req, res) => {
  const { id } = req.params;

  try {
    const query = { _id: id };
    const result = await Listing.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted listing.");
      res.status(200).json({success: true})
    } else {
      res.status(404).json({success: false, error: "Listing does not exist"});
    }

  } catch (error) {
    console.error("Error deleting listing", error);
    res.status(400).json({ error: error.message});
  }

}

// BUY PAL
const buyListing = async(req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    // find pal
    const listing = await Listing.findById(id);

    if (!listing) {
      res.status(404).json({success: false, error: "Listing does not exist"});
    }

    // find user
    const user = await User.findOne({username: username});
    if (!user) {
      res.status(404).json({success: false, error: "User does not exist"});
    }

    console.log(user.balance, listing.cost);

    // make sure the user has enough
    if (user.balance - listing.cost >= 0) {

      // transfer pal
      const newUser = { $set: {username: username}};
      const options = { upsert: true };
      const result = await UserPal.updateOne({ _id: listing.userPal[0].id}, newUser, options);


      if (!result) {
        console.log('Userpal was not deleted successfuly');
        res.status(404).json({success: false, error: "Error updating Userpal"});
      }
      console.log("Successfully transfered pal from listing.");
      const newBalance = user.balance - listing.cost; 
      const balanceResult = await User.updateOne({username: username}, { $set: {balance: newBalance}}, options)

      if (!balanceResult) {
        console.log('Userpal was not deleted successfuly');
        res.status(404).json({success: false, error: "Error updating user's balance"});
      }

      res.status(200).json({success: true, message: user.balance});
      
    } else {
      res.status(404).json({success: false, error: "Not enough funds"});
    }
  } catch (error) {
    res.status(404).json({success: false, error: error.message});
  }
}

module.exports = {
  getListings,
  getListing,
  getUserListings,
  createListing,
  deleteListing,
  buyListing
};