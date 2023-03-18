var express = require('express');
var router = express.Router();

/* GET inventory listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a inventory');
});

module.exports = router;