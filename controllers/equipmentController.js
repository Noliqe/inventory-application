const Equipment = require("../models/equipment");
const async = require("async");

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