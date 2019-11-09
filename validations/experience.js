const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  //data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  //data.to = !isEmpty(data.to) ? data.to : "";
  //data.current = !isEmpty(data.current) ? data.current : "";
  //data.description = !isEmpty(data.description) ? data.description : "";


  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  /*if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }*/

  if (Validator.isEmpty(data.from)) {
    errors.from = "From is required";
  }

  /*if (Validator.isEmpty(data.to)) {
    errors.to = "To field is required";
  }

  if (Validator.isEmpty(data.current)) {
    errors.current = "Current field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }*/

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
