const Category = require("../models/category");
const Equipment = require("../models/equipment");
const async = require("async");
const { body, validationResult } = require("express-validator");

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

// Display category create form on GET.
exports.category_create_get = (req, res, next) => {
  res.render("category_create", { title: "Create Category" });
};

// Handle category create on POST.
exports.category_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Discription must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a equipment object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      res.render("category_create", {
        title: "Create Category",
        errors: errpr.array(),
      });
      return;
    } else {
      // Data from the form is valid
      // Check if Category with the same name already exist
      Category.findOne({ name: req.body.name }).exec((err, found_category) => {
        if (err) {
          return next(err)
        }

        if (found_category) {
          // Category exist redirect to its detail page.
          res.redirect(found_category.url);
        } else {
          category.save((err) => {
            if (err) {
              return next(err);
            }
            // Category saved. Redirect to category detail page.
            res.redirect(category.url);
          });
        }
      });
    }

  }
];

// Display Category delete form on GET
exports.category_delete_get = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      equipment(callback) {
        Equipment.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
            //Succesful
            res.render("category_delete", {
                title: "Category",
                category: results.category,
                equipment: results.equipment,
            });
        });
}

// Handle Category delete on POST
exports.category_delete_post = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.body.categoryid).exec(callback);
      },
      equipment(callback) {
        Equipment.find({ category: req.body.categoryid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Succes
      if (results.equipment.length > 0) {
        // Category has books. render in same way as for GET route
        res.render("category_delete", {
          title: "Category",
          category: results.category,
          equipment: results.equipment,
      });
      return;
      }
      // Category has no books. Delete object and redirect to the list of categories
      Category.findByIdAndRemove(req.body.categoryid, (err) => {
        if (err) {
          return next(err);
        }
      });
      // Succes 
      res.redirect("/category");
    }
  );
};