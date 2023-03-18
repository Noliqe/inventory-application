const express = require("express");
const router = express.Router();
const equipment_controller = require("../controllers/equipmentController");

/* GET equipment listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a equipment');
// });

// GET request for list of all equipments.
router.get("/", equipment_controller.equipment_list);

module.exports = router;