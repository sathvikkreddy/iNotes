const mongoose = require("mongoose");

const { Schema } = mongoose;

const noteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, require: true },
  note: { type: String, require: true },
  tag: { type: String, default: "general" },
  timestamp: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
