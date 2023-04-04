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
            res.render("inventory_list", {
                title: "Inventory List",
                inventory_list: list_equipments,
            });
        });
};