const express = require('express');
const Pal = require('../models/pal.model');
const { getTrait, getTraits } = require('../controllers/trait.controller');

const router = express.Router();

// GET all traits
router.get('/', getTraits);
// GET a single trait
router.get('/:name', getTrait);

module.exports = router;