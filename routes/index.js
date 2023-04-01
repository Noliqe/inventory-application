var express = require('express');
var router = express.Router();
const index_controller = require("../controllers/indexController");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// GET home page.
router.get("/", index_controller.home_list);

module.exports = router;
