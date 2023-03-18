var express = require('express');
var router = express.Router();

/* GET category listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a category');
});

module.exports = router;
