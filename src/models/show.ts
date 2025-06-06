import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  show_id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  director: { type: String },
  cast: [{ type: String }],
  country: { type: String },
  date_added: { type: Date },
  release_year: { type: Number },
  rating: { type: String },
  duration: { type: String },
  listed_in: [{ type: String }],
  description: { type: String },
});

export default mongoose.model("Show", showSchema);
