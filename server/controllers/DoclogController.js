const bcrypt = require("bcrypt");
const { Doc } = require("../models/docModel");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const DoclogController = async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const user = await Doc.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) {
      return res.status(401).send({ message: "Invalid User or Password" });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    // console.log(req.body.password)
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }
    res.status(200).send({ data: user, message: "Logged Successfully" });
    // console.log(1);
  } catch (err) {
    res.status(500).send({ message: "Login Error" });
  }
};

const validate = (data) => {
  const passOption = {
    min: 8,
    max: 30,
  };
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity(passOption).required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { DoclogController };