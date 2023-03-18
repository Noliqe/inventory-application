const express = require("express");
const router = express.Router();

/* GET equipment listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a equipment');
  });
  
  module.exports = router;