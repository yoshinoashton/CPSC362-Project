const express = require('express');
const {
  createUser,
  loginUser,
  authenticateUser,
  getUser,
  updateFunds
} = require('../controllers/auth.controller');

const { verifyJWT } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/auth', verifyJWT, authenticateUser);

router.get('/:id', getUser);

router.put('/balance/:id', updateFunds);

module.exports = router;