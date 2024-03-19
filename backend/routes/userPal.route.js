const express = require('express');

const { createUserPal } = require('../controllers/userPal.controller');

const router = express.Router();

// POST a new pal
router.post('/', createUserPal);

module.exports = router;