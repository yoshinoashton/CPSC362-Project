// Import environmental variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const palRoutes = require('./routes/pals.route');
const listingRoutes = require('./routes/listing.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');

// Create express app
const app = express();

// Enable CORS
var corsOption = {
  origin: ("http://localhost:", process.env.PORT)
};
app.use(cors(corsOption));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/pals', palRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/account', authRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connect to db');
    // listen for request
    app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
});
  })
  .catch((error) => {
    console.log(error);
  })

