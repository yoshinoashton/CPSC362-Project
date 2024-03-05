const User = require('../models/user.model');
const mongoose = require('mongoose');

// Create User
const createUser = async (req, res) => {
  const { username, email, password } = req.body
  try {


    const user = await User.create({ username, email, password });
  }
  catch(error) {

  }
}

