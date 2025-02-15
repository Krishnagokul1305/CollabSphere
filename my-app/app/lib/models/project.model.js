import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this project"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description for this project"],
    trim: true,
  },
  url: String,
});

const projectModel = mongoose.model("Project", schema);

export default projectModel;
