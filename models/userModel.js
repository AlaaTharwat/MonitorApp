const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 7,
    maxlength: 255,
    //  required: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  token: {
    type: String,
  },
  checks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "check",
  }],
  isVerified: { type: Boolean, default: false },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      isAdmin: this.isAdmin,
    },
    process.env.MONITOR_JWT_KEY,
    {
      expiresIn: 2 * 60 * 3600,
    }
  );
  return token;
};
const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(7).max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
