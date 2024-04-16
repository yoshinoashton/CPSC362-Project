const express = require('express');

const { getUser, updateFunds } = require('../controllers/user.controller');

const router = express.Router();

// GET a user info
router.get('/:id', getUser);

router.put('/balance/:id', updateFunds);

module.exports = router;