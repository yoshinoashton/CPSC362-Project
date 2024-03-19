const Trait = require('../models/trait.model')
const mongoose = require('mongoose');

// GET all pals
const getTraits = async (req, res) => {
  const traits = await Trait.find({});
  res.status(200).json(traits);
}

// GET a single pal
const getTrait = async (req, res) => {
  const { name } = req.params;

  const trait = await Trait.findOne({name: name});

  if (!trait) {
    return res.status(404).json({error: 'No such trait exists'});
  }

  res.status(200).json(trait);
}

module.exports = {
  getTraits,
  getTrait
};
