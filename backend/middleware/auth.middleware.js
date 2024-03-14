const jwt = require("jsonwebtoken");

require('dotenv').config();

function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.json({message: "Incorrect token", success: false});
        return res.sendStatus(403);
      }

      req.user = decoded;
      next();
    })
  }
}

module.exports = {
  verifyJWT
};