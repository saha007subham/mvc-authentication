const { Schema, model } = require("mongoose");
const { type } = require("node:os");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      require: true,
      // min: [3, "Minimum 3 characters are required"],
    },
    salt: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const User = model("user", userSchema);
module.exports = User;
