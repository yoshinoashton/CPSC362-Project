const express = require('express');

const { createUserPal, getUserPals, deleteUserPal } = require('../controllers/userPal.controller');

const router = express.Router();

// POST a new pal
router.post('/', createUserPal);

// DELETE one pal
router.delete('/:id', deleteUserPal)

// GET all pals
router.get('/:username', getUserPals);

// GET one pal
// router.get('/:id', getUserPal())


module.exports = router;