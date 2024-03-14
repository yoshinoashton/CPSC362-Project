const express = require('express');

const { getUser } = require('../controllers/user.controller');

const router = express.Router();

// GET a user info
router.get('/:id', getUser);

module.exports = router;