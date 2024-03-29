import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the category is required"],
    },
    description: {
      type: String,
      required: [true, "Description of the category is required"],
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "publisher",
    },
  },
  { timeStamps: true }
);

const CategoriesModel = mongoose.model("category", categorySchema);
export default CategoriesModel;
