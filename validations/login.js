const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateLoginInput(data) {
  let erross = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.password)) {
    erross.password = "Pass required";
  }

  if (!Validator.isEmail(data.email)) {
    erross.email = "Email required";
  }
  return {
    erross,
    isValid: isEmpty(erross)
  };
};
