const User = require('../models/user.model')
const mongoose = require('mongoose');


// GET a user
const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({username: id});

  if (!user) {
    return res.status(404).json({error: 'No such user exists'});
  }
  res.status(200).json({username: user.username, id: user.id});
}

module.exports = {
  getUser
};
