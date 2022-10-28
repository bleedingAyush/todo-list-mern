const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    userId: { type: String, trim: true, required: true },
    todo: { type: String, trim: true, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;
