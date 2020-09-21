const logger = require("../logger");
const { model: Course, validate: validateCourse } = require("../models/Course");

exports.get = (req, res) => {
  Course.find(req.query, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
};

exports.insert = async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const data = {
    title: req.body.title,
    details: req.body.details,
    price: req.body.price,
    duration: req.body.duration,
  };
  const obj = new Course(data);
  logger.info("Course Insert: ", obj);
  obj.save((err, result) => {
    if (err) {
      if (err.code && err.code === 11000)
        res.status(400).send("Course already present");
      return console.error(err);
    }
    res.send(result);
  });
};

exports.update = async (req, res) => {
  console.log("Update body", req.body);
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const data = {
    title: req.body.title,
    details: req.body.details,
    price: req.body.price,
    duration: req.body.duration,
  };
  Course.findByIdAndUpdate(req.params.id, { $set: data }, (err, result) => {
    if (err) return console.log(err);
    if (!result)
      return res
        .status(404)
        .send("Couldn't perform operation: Something went wrong");
    res.send(result);
  });
};

exports.delete = (req, res) => {
  Course.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) return console.log(err);
    if (!result)
      return res
        .status(404)
        .send("Couldn't perform operation: Something went wrong");
    res.send(result);
  });
};

exports.getById = (req, res) => {
  try {
    Course.findById(req.params.id, (err, result) => {
      if (err) {
        return console.log(err);
      }
      if (!result) return res.status(404).send("Course not found!!");
      res.send(result);
    });
  } catch (ex) {
    // if invalid object id comes
    res.status(404).send("Course not found!!");
    console.error(ex);
  }
};
