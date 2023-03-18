const Equipment = require("../models/equipment");
const async = require("async");

// Display list of all Equipments
exports.equipment_list = function (req, res, next) {
    Equipment.find()
        .sort([["name", "ascending"]])
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