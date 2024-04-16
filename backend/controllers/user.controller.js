const User = require('../models/user.model');
const mongoose = require('mongoose');


// GET a user
const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({username: id});

  if (!user) {
    console.error("User does not exist");
    return res.status(404).json({error: 'User does not exist.'});
  }
  res.status(200).json({username: user.username, id: user.id});
}

// PUT (update) user funds
const updateFunds = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const options = { upsert: true };

    const result = await User.updateOne({username: id}, { $set: { balance: amount}}, options);
    if (!result ) {
      res.status(404).json({success: false, error: "Unable to add funds"});
    }
    console.log(result);
    res.status(200).json({success: true, message: "Funds added."});
  } catch (error) {
    res.status(404).json({success: false, error: error.message});
  }
}
module.exports = {
  getUser,
  updateFunds
};
