const bcrypt = require("bcrypt");
const _ = require("lodash");

let { ErrorHandler } = require("../handlers/errorHandler");

const { User, validateUser } = require("../models/userModel");
const sendEmail = require("../utils/emailSending");

exports.createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)  throw new ErrorHandler(400, error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)  throw new ErrorHandler(400, "User already exists");
  user = new User(_.pick(req.body, ["username", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  // user.password = await hashPassword(user.password)

  const token = user.generateToken();
  user.token = token;
  try {
    await user.save();
  } catch (err) {
    throw new ErrorHandler(500, error);
  }

  emailBody = `Please verify your account by clicking the link:\nhttp:\/\/${req.headers.host}\/api\/user\/confirmation\/${user._id}/${token}.\n `;
  sendEmail(user.email, emailBody, "Verification Email");

  let msg = `A verification email has been sent to ' ${user.email}'.'`;
  return res.status(201).send({status: "success" ,message: msg});
};

exports.emailConfirmation = async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.findOne({ _id: req.params.id });
    if (!user)  throw new ErrorHandler(400, "Invalid URL");

    if (user.token != req.params.token) throw new ErrorHandler(400, "Invalid URL");

    await User.updateOne({ _id: user._id, isVerified: true, token: "" });
    // await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully");
  } catch (error) {
    throw new ErrorHandler(400, error);
  }
};

exports.resendTokenPost = async (req, res) => {
  // Check for validation errors
  let user = await User.findOne({ email: req.body.email });
  if (!user) throw new ErrorHandler(400, "Invalid Email");
  if (user.isVerified)
    throw new ErrorHandler(
      400,
      "This account has already been verified. Please log in."
    );

  // Create a verification token, save it, and send email
  const token = user.generateToken();

  user.token = token;
  // Save the token

  try {
    await user.save();
  } catch (err) {
    throw new ErrorHandler(500, err);
  }

  emailBody = `Please verify your account by clicking the link:\nhttp:\/\/${req.headers.host}\/api\/user\/confirmation\/${user._id}/${token}.\n `;
  sendEmail(user.email, emailBody);

  let msg = `A verification email has been sent to ' ${user.email}'.'`;
  return res.status(201).send(msg);
};
