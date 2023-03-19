var express = require('express');
var router = express.Router();
const category_controller = require("../controllers/categoryController");

// GET request for list of all categories.
router.get("/", category_controller.category_list);

// GET request for one category.
router.get("/:id", category_controller.category_detail);


module.exports = router;
