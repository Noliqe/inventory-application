const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 20 },
  description: {type: String, required: true, maxLength: 100},
  equipment: [{ type: Schema.Types.ObjectId, ref: "Equipment" }],
});

// Virtual for categories URL
CategorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);
