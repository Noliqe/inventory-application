const Category = require("../models/category");
const async = require("async");

// Display list of all Categories
exports.category_list = function (req, res, next) {
    Category.find()
        .sort([["name", "ascending"]])
        .populate("equipment")
        .exec(function (err, list_categories) {
            if (err) {
                return next(err);
            }
            //Succesful
            console.log(list_categories)
            res.render("category_list", {
                title: "Category List",
                category_list: list_categories,
            });
        });
};

// Display detail page for a specific category.
exports.category_detail = (req, res, next) => {
    async.parallel(
      {
        category(callback) {
          Category.findById(req.params.id)
            .populate("equipment")
            .exec(callback);
        },
      },
      (err, results) => {
        if (err) {
          return next(err);
        }
        if (results.category == null) {
          // No results.
          const err = new Error("category not found");
          err.status = 404;
          return next(err);
        }
        // Successful, so render.
        console.log(results.category)
        res.render("category_detail", {
          title: results.category.name,
          category_detail: results.category,
        });
      }
    );
  };