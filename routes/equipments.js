const express = require("express");
const router = express.Router();
const equipment_controller = require("../controllers/equipmentController");


// GET request for list of all equipments.
router.get("/", equipment_controller.equipment_list);

// GET request for create equipment
router.get("/createequipment", equipment_controller.equipment_create_get);

// POST request for create equipment
router.post("/createequipment", equipment_controller.equipment_create_post);

// GET request to delete equipment.
router.get("/:id/delete", equipment_controller.equipment_delete_get);

// POST request to delete equipment.
router.post("/:id/delete", equipment_controller.equipment_delete_post);

// GET request for one equipment.
router.get("/:id", equipment_controller.equipment_detail);


module.exports = router;