const Pal = require('../models/pal.model')
const mongoose = require('mongoose');

// GET all pals
const getPals = async (req, res) => {
  const pals = await Pal.find({});
  res.status(200).json(pals);
}

// GET a single pal
const getPal = async (req, res) => {
  const { id } = req.params;

  const pal = await Pal.findOne({name: id})

  if (!pal) {
    return res.status(404).json({error: 'No such pal exists'});
  }

  res.status(200).json(pal);
}

module.exports = {
  getPals,
  getPal
};
