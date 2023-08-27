import mongoose, { Schema, model } from "mongoose";

const formSchema = new Schema(
  {
    userDetails: {
      addressLine1: String,
      addressLine2: String,
      city1: String,
      city2: String,
      email: String,
      firstname: String,
      lastname: String,
      phoneNumber: Number,
      password: String,
      pincode1: Number,
      pincode2: Number,
      state1: String,
      state2: String,
    },
    selectedOptions: [String],
    Files: [String],
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const FormModel = model("Form", formSchema);

export default FormModel;
