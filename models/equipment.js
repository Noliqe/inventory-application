const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  name: { type: String, required: true, maxLength: 20 },
  discription: { type: String, required: true, maxLength: 100 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number },
  stock: { type: Number},
});

// Virtual for equipments UL
EquipmentSchema.virtual("url").get(function () {
    return `/category/equipment/${this._id}`;
})

// Export model
module.exports = mongoose.model("Equipment", EquipmentSchema);