const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    line1: { type: Number },
    line2: { type: Number },
    city: { type: String },
    state: { type: String },
    zip_Code: { type: Number }
  },
  phone: { type: Number },

  credit_Card: {
    expiry_date: { type: Date },
    CVV: { type: Number },
    zip_Code: { type: Number },
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
