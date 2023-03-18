var express = require('express');
var router = express.Router();
const category = require("../controllers/categoryController");

/* GET category listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a category');
// });

// GET request for list of all categories.
router.get("/", category.category_list);


module.exports = router;
