const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateRegisterInput(data) {
  let erross = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    erross.name = "Name bad";
  }
  if (Validator.isEmpty(data.name)) {
    erross.name = "Name required";
  }
  if (Validator.isEmpty(data.password)) {
    erross.password = "Pass required";
  }
  if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
    erross.password2 = "Pass2 required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    erross.password2 = "Pass not equal";
  }
  if (!Validator.isEmail(data.email)) {
    erross.email = "Email required";
  }
  return {
    erross,
    isValid: isEmpty(erross)
  };
};
