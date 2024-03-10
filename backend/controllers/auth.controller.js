const User = require('../models/user.model');
const mongoose = require('mongoose');

// Create User
const createUser = async (req, res) => {
  const { username, email, password } = req.body

  const data = {
    email: email,
    password: password,
    username: username
  };

  try {
    const emailExists = await User.findOne({email: email});

    if (emailExists) {
      res.json("Email already exists");
    } 
    else {
      res.json("Email is valid");

      const user = await User.create({ username, email, password });
      res.status(200).json(user);
    }
  }
  catch(error) {
    console.error("Error creating account", error);
    res.status(400).json({ error: error.message});
    res.json(error);
  }
}

// User login request
const loginUser = async (req, res) => {
  const { username, password} = req.body;

  try {
    const userExists = await User.findOne({username: username});

    if (userExists) {  
      if (password === userExists.password) {
        res.json("Sucessful login");
      } else {
        res.json("Wrong password");
      }

    } else {
      res.json("User does not exist");
    }
  } 
  catch (error) {
    res.json(error);  
  }
}

module.exports = {
  createUser,
  loginUser
};