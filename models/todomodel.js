import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  titre: {
    type: String,
    required: true,
  },
  etat: {
    type: Boolean,
    default: false,
  },
});
const todo = mongoose.model("todo", todoSchema);
export default todo;
