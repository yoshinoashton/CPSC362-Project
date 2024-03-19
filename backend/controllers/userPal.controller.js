const UserPal = require('../models/userPal.model')
const Pal = require('../models/pal.model')
const Trait = require('../models/trait.model')
const mongoose = require('mongoose');

// GET user pal


const createUserPal= async (req, res) => {
  const { username, pal_name, level, traits } = req.body;
  try {
    // find pal
    const pal = await Pal.findOne({name: pal_name });
    // check if pal was found
    if (!pal) {
      return res.status(404).json({error: "Pal not found"});
    }

    console.log("Sucessfully found pal: ", pal);

    // get traits
    const TraitArray = []
    for (const [key, value] of Object.entries(traits)) {
      const trait = await Trait.findOne({name: value});
      if (!trait) {
        return res.status(404).json({error: "Incorrect trait name"});
      }

      TraitArray.push(trait);
      console.log("Sucessfully found trait: ", trait);
    }

    console.log("Success: Loaded all required data from db");

    // add to database
    const userPal = await UserPal.create({ username, pal: pal, level, "traits": TraitArray });
    res.status(200).json(userPal);
  } catch (error) {
    console.error("Error creating userPal", error);
    res.status(400).json({ error: error.message});
  }
}

// DELETE user pal




module.exports = {
  createUserPal
};
