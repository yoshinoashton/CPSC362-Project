const Pal = require('../models/pal.model');

const nameToID = (req, res, next) => {
  const id = Pal.find({ name: req.body.pal_id});
  if (!id) {
    res.json({ error: "Unable to find ID of pal."})
  } else {
    req.pal_id = id;
    next();
  }
};