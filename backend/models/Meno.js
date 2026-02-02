import mongoose from "mongoose";

const MenoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
});

export default mongoose.model("Meno", MenoSchema);
