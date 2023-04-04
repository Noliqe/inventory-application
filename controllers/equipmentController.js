const Equipment = require("../models/equipment");
const Category = require("../models/category");
const async = require("async");
const { body, validationResult } = require("express-validator");
const categoryController = require("./categoryController");

// Display list of all Equipments
exports.equipment_list = function (req, res, next) {
    Equipment.find()
        .sort([["name", "ascending"]])
        .populate("category")
        .exec(function (err, list_equipments) {
            if (err) {
                return next(err);
            }
            //Succesful
            res.render("equipment_list", {
                title: "Equipment List",
                equipment_list: list_equipments,
            });
        });
};

// Display detail page for a specific equipment.
exports.equipment_detail = (req, res, next) => {
    async.parallel(
      {
        equipment(callback) {
          Equipment.findById(req.params.id)
            .populate("category")
            .exec(callback);
        },
      },
      (err, results) => {
        if (err) {
          return next(err);
        }
        if (results.equipment == null) {
          // No results.
          const err = new Error("equipment not found");
          err.status = 404;
          return next(err);
        }
        // Successful, so render.
        res.render("equipment_detail", {
          title: results.equipment.name,
          equipment_detail: results.equipment,
        });
      }
    );
  };

// Display equipment create form on GET.
exports.equipment_create_get = (req, res, next) => {
  Category.find()
  .sort([["name", "ascending"]])
  .populate("equipment")
  .exec(function (err, results) {
      if (err) {
          return next(err);
      }
      //Succesful
      res.render("equipment_create", {
        title: "Create Equipment",
        category_list: results,
      });
  });
};

// Handle Equipment create on POST.
exports.equipment_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Discription must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category").escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stock")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a equipment object with escaped and trimmed data.
    const equipment = new Equipment({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      Category.find()
        .sort([["name", "ascending"]])
        .populate("equipment")
        .exec(function (err, results) {
        if (err) {
            return next(err);
        }
        //Succesful
        res.render("equipment_create", {
          title: "Create Equipment",
          category_list: results,
        });
      });
      return;
    }

    // Data from form is valid.
    equipment.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful
      // Update category
      Category.updateOne(
        { "_id": req.body.category}, // Filter
        {$push: {"equipment": equipment}}, // Update
        {upsert: true}
    )
    .then((obj) => {
        console.log('Updated - ' + obj);
        
    })
    .catch((err) => {
        return next(err);
   })
      // Redirect to new record.
      res.redirect(equipment.url);
    });
  },
];

// Display Equipment delete form on GET
exports.equipment_delete_get = (req, res, next) => {
  Equipment.findById(req.params.id)
        .exec(function (err, results) {
            if (err) {
                return next(err);
            }
            //Succesful
            res.render("equipment_delete", {
                title: "Equipment",
                equipment: results,
            });
        });
}

// Handle Equipment delete on POST
exports.equipment_delete_post = (req, res, next) => {
  Equipment.findById(req.body.equipmentid)
  .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      // Succes
      Equipment.findByIdAndRemove(req.body.equipmentid, (err) => {
        if (err) {
          return next(err);
        }
      });
      // Update category
      Category.updateOne(
        {"_id": results.category}, //Filter
        {$pull: {"equipment": req.body.equipmentid}}, //Update
      )
      .then(() => {
        console.log("Updated")
      })
      .catch((err) => {
        return next(err);
      })
      res.redirect("/equipment");
    }
  );
};