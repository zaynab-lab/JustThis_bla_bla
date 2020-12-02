const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    title: { type: String },
    subCategory: { type: [String] }
  },
  { collection: "categories" }
);

module.exports = mongoose.model("Category", categorySchema);
