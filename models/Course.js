const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Joi = require("joi");

const schema = new mongoose.Schema(
  {
    title: String,
    details: String,
    price: mongoose.Schema.Types.Double,
    duration: Number, // in hrs
  },
  { versionKey: false }
);

const model = mongoose.model("KiCourse", schema);

function validate(dataToBeValidated) {
  const joiSchema = Joi.object().keys({
    title: Joi.string().required(),
    details: Joi.string().required(),
    price: Joi.number().required(),
    duration: Joi.number().required(),
  });
  return joiSchema.validate(dataToBeValidated);
}

exports.validate = validate;
exports.model = model;
exports.schema = schema;
