const express = require("express");
const router = express.Router();
const equipment_controller = require("../controllers/equipmentController");


// GET request for list of all equipments.
router.get("/", equipment_controller.equipment_list);

// GET request for one equipment.
router.get("/:id", equipment_controller.equipment_detail);

module.exports = router;