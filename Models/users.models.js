// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
        type: String,
        required: true
      },
    lastname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      contact: {
        type: Number,
        required: true
      },
      address: {
        type: String,
        required: true
      }
},
{
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;