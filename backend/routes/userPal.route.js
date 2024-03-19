const express = require('express');

const { createUserPal, getUserPals } = require('../controllers/userPal.controller');

const router = express.Router();

// POST a new pal
router.post('/:username', createUserPal);

// GET all pals
router.get('/:username', getUserPals);

// GET one pall
// router.get('/:id', getUserPal())

module.exports = router;