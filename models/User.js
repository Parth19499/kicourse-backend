const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const PC = require("joi-password-complexity");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
schema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      email: this.email,
      name: this.name,
    },
    config.get("app.jwtPrivateKey")
  );
};
const model = mongoose.model("KiUser", schema);

function validate(dataToBeValidated) {
  const joiSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().min(5).max(50).email().required(),
    password: PC({
      min: 8,
      max: 25,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }),
  });

  return joiSchema.validate(dataToBeValidated);
}

exports.schema = schema;
exports.model = model;
exports.validate = validate;
