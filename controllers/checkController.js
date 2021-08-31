const _ = require("lodash");

const Monitor = require("ping-monitor");

const { Check } = require("../models/checkModel");
const { User } = require("../models/userModel");

let { ErrorHandler } = require("../handlers/errorHandler");

const monitor = require('../businessLogic/monitorURLs/monitor')


exports.getAll = async () => {
  const checks = await Check.find().populate("user");
  return checks;
};

exports.createCheck = async (req, res) => {
  let check = await Check.findOne({ title: req.body.title });
  if (check) throw new ErrorHandler(400, "Already exists!!");

  const user = await User.findOne({ _id: req.body.user });
  if (!user) throw new ErrorHandler(400, "user not exists!!");

  check = new Check(
    _.pick(req.body, [
      "title",
      "website",
      "protocol",
      "interval",
      "port",
      "path",
      "threshold",
      "httpHeaders",
      "user",
    ])
  );

  try {
    await check.save();
  } catch (err) {
    throw new ErrorHandler(400, err);
  }

  user.checks.push(check);
  try {
    await user.save();
  } catch (err) {
    throw new ErrorHandler(400, err);
  }
  monitor.monitorURLs()

  return res.status(200).send({ status: "success" });
};

exports.stopCheck = async (req, res) => {
  let check = await Check.findOne({
    title: req.body.title,
    user: req.body.user,
  });
  if (!check) throw new ErrorHandler(400, "No such check!!");

  check.isStopped = true;
  try {
    await check.save();
  } catch (err) {
    throw new ErrorHandler(400, err);
  }

  return res.status(200).send({ status: "success" });
};

exports.deleteCheck = async (req, res) => {
  let checkName = req.body.title;

  try {
    await Check.findOneAndRemove({title: checkName})
  } catch (err) {
    throw new ErrorHandler(400, err);
  }

  return res.status(200).send({ status: "success" });

};
 