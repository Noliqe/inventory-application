const Equipment = require("../models/equipment");
const Category = require("../models/category");
const async = require("async");

//Displays list of all categories and equipments
exports.home_list = (req, res, next) => {
    async.parallel(
        {
            category_list(callback) {
                Category.find().exec(callback);
            },

            equipment_list(callback) {
                Equipment.find().exec(callback);
            },
        },
        (err, results) => {
            if (err) {
              return next(err);
            }
            // Successful, so render
            res.render("index", {
                title: "home",
                category_list: results.category_list,
                equipment_list: results.equipment_list,
            });
          }
    );
};