const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

// Create User
const createUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const emailExists = await User.findOne({email: email});
    const foundUser = await User.findOne({username: username});

    if (emailExists) {
      res.json({message: "Email already exists"});
      return;
    } 
    else if (foundUser) {
      res.json({message: "Username already exits"})
      return;
    }
    else {
      encrpt_password = await bcrypt.hash(password, 10);
      console.log(encrpt_password);

      const user = await User.create({ username, email, "password": encrpt_password });
      res.json({ message: "Account succesfully created "});
      return;
    }
  }
  catch(error) {
    console.error("Error creating account\n", error);
    res.status(400).json({ error: error.message});
    res.json(error);
    return;
  }
}

// User login request
const loginUser = async (req, res) => {
  const { username, password} = req.body;

  // Looking for user with same username from database
  const foundUser = await User.findOne({username: username});

  if (foundUser) {  
    console.log(foundUser);
    // Compare encrpyted passwords to ensure they match
    bcrypt.compare(password, foundUser.password, function (error, response) {
      if (error) {
        console.log(error);
        res.json(error);
        res.status(400).json({ error: error.message});
      }
      if (response) {
        const payload = {
          id: foundUser._id,
          username: foundUser.username,
          balance: foundUser.balance
        }
  
        // Creating Access token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400})
        res.json({success: true, message: "Sucessful login", token: "Bearer " + token, user: payload});
      } else {
        return res.json({success: false, message: "Incorrect password"})
      }
    });
  } else {
    res.json({success: false, message: "User does not exist"});
  }
}

const authenticateUser = async (req, res) => {
  const user = req.user;
  res.json({ success: true, username: user.username, id: user.id, balance: user.balance})
}

// GET a user
const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({username: id});

  if (!user) {
    console.error("User does not exist");
    return res.status(404).json({error: 'User does not exist.'});
  }
  return res.status(200).json({username: user.username, id: user.id, balance: user.balance});
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
  createUser,
  loginUser,
  authenticateUser,
  getUser,
  updateFunds
};