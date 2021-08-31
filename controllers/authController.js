const Joi = require("joi");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

let { ErrorHandler } = require("../handlers/errorHandler");


exports.auth = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) throw new ErrorHandler(400, error.details[0].message);

//return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user)  throw new ErrorHandler(400, "wrong Email");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)   throw new ErrorHandler(400, "wrong password");

  if (!user.isVerified) throw new ErrorHandler(400, "User is not verified");

  const token = user.generateToken();

  res.status(201).send({status: "success" , token: token});
};


function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}
