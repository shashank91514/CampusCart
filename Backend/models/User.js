const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // User Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Password
    password: {
      type: String,
      required: true,
    },

    // College
    college: {
      type: String,
      trim: true,
    },

    // Wishlist
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);