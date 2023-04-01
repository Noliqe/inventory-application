var express = require('express');
var router = express.Router();
const category_controller = require("../controllers/categoryController");

// GET request for list of all categories.
router.get("/", category_controller.category_list);

// GET request for create category
router.get("/createcategory", category_controller.category_create_get);

// Post request for create category
router.post("/createcategory", category_controller.category_create_post);

// GET request for one category.
router.get("/:id", category_controller.category_detail);



module.exports = router;
