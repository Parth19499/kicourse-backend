const { model: User, validate: validateUser } = require("../models/User");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const logger = require("../logger");

exports.getMe = async (req, res) => {
  const obj = await User.findById(req.user._id).select("-_id -password");
  res.send(obj);
};

exports.insert = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let obj = await User.findOne({ email: req.body.email });
  if (obj) return res.status(400).send("User already registered!");

  obj = new User(_.pick(req.body, ["name", "email", "password"]));
  obj.password = await bcrypt.hash(obj.password, await bcrypt.genSalt(10));
  obj.save((err, result) => {
    if (err) {
      if (err.code && err.code === 11000)
        res.status(400).send("User already present");
      return logger.error(err);
    }
    res
      .header("x-auth-token", obj.generateAuthToken())
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(result, ["_id", "name", "email"]));
  });
};

exports.auth = async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const obj = await User.findOne({ email: req.body.email });
  if (!obj) return res.status(400).send("Invalid email or password!");

  const validPassword = await bcrypt.compare(req.body.password, obj.password);
  if (!validPassword) return res.status(400).send("Invalid email or password!");
  const token = obj.generateAuthToken();
  res.send(token);
};

function validateAuth(dataToBeValidated) {
  const joiSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return joiSchema.validate(dataToBeValidated);
}
