const bcyrpt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.findbyId(id, (err, user) => {
    done(err, user);
  });
});

