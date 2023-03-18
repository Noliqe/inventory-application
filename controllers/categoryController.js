const Category = require("../models/category");
const async = require("async");

// Display list of all Categories
exports.category_list = function (req, res, next) {
    Category.find()
        .sort([["name", "ascending"]])
        .exec(function (err, list_categories) {
            if (err) {
                return next(err);
            }
            //Succesful
            res.render("category_list", {
                title: "Category List",
                category_list: list_categories,
            });
        });
};