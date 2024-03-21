const UserPal = require('../models/userPal.model')
const Pal = require('../models/pal.model')
const Trait = require('../models/trait.model')
const User = require('../models/user.model')
const mongoose = require('mongoose');

// GET user pal
const getUserPals = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({username: username});
    if (!user) {
      console.error("User does not exist");
      return res.status(404).json({error: "User does not exist."});
    }

    const pals = await UserPal.find({username: username});
    if (!pals) {
      return res.status(404).json({error: "Error: Could not load user's pals"});
    }

    res.status(200).json({success: true, pals: pals});

  } catch(error) {
    console.error("Error getting userpals\n", error);
    res.status(400).json({ error: error.message});
  }
}

// GET a single pal
const getUserPal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No pal exists with that id'});
  }

  const pal = await UserPal.findById(id);

  if (!pal) {
    return res.status(404).json({error: 'No pal exists with that id'});
  }

  res.status(200).json(pal);
}


const createUserPal= async (req, res) => {
  const { username, pal_name, level, traits } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({username: username});
    if (!user) {
      return res.status(404).json({error: "User does not exist"});
    }
    
    // find pal
    const pal = await Pal.findOne({name: pal_name });
    // check if pal was found
    if (!pal) {
      return res.status(404).json({error: "Pal not found"});
    }


    // get traits
    const TraitArray = []
    for (const [key, value] of Object.entries(traits)) {
      const trait = await Trait.findOne({name: value});
      if (!trait) {
        return res.status(404).json({error: "Incorrect trait name"});
      }

      TraitArray.push(trait);
    }


    // add to database
    const userPal = await UserPal.create({ username, pal: pal, level, "traits": TraitArray });
    res.status(200).json({userPal, success: true});
    console.log('Success: Pal created', userPal._id)
  } catch (error) {
    console.error("Error creating userPal", error);
    res.status(400).json({ error: error.message});
  }
}

// DELETE user pal
const deleteUserPal = async(req, res) => {
  const { id } = req.params;

  try {
    const query = { _id: id };
    const result = await UserPal.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted user pal.");
      res.status(200).json({success: true})
    } else {
      res.status(404).json({success: false, error: "User pal does not exist"});
    }

  } catch (error) {
    console.error("Error deleting userPal", error);
    res.status(400).json({ error: error.message});
  }

}




module.exports = {
  createUserPal,
  getUserPals,
  getUserPal,
  deleteUserPal
};
