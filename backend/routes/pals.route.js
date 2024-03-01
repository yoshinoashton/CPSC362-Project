const express = require('express');
const {
  getPals,
  getPal
} = require('../controllers/pal.controller');
const Pal = require('../models/pal.model')

const router = express.Router();

// GET all pals
router.get('/', getPals);
// GET a single pal
router.get('/:id', getPal);

module.exports = router;