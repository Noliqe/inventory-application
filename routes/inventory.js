const express = require("express");
const router = express.Router();
const inventory_controller = require("../controllers/inventoryController");

// GET request for list of all equipments for inventory.
router.get("/", inventory_controller.equipment_list);

module.exports = router;