const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 20 },
  discription: {type: String, required: true, maxLength: 100},
  number_of_equipment: { type: Number},
  equipment: { type: Array },
});

// Virtual for categories URL
CategorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);
