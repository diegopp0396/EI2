const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  console.log(JSON.stringify(data.education[0].school));
  data.experience[0].title = !isEmpty(data.experience[0].title) ? data.experience[0].title : "";
  data.experience[0].company = !isEmpty(data.experience[0].company) ? data.experience[0].company : "";
  data.experience[0].from = !isEmpty(data.experience[0].from) ? data.experience[0].from : "";
  data.education[0].school = !isEmpty(data.education[0].school) ? data.education[0].school : "";
  data.education[0].degree = !isEmpty(data.education[0].degree) ? data.education[0].degree : "";
  data.education[0].fieldofstudy = !isEmpty(data.education[0].fieldofstudy) ? data.education[0].fieldofstudy : "";
  data.education[0].from = !isEmpty(data.education[0].from) ? data.education[0].from : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (Validator.isEmpty(data.experience[0].title)) {
    errors.title = "Experience Title  is required";
  }

  if (Validator.isEmpty(data.experience[0].company)) {
    errors.company = "Experience Company field is required";
  }

  if (Validator.isEmpty(data.experience[0].from)) {
    errors.from = "Experience From field is required";
  }
  if (Validator.isEmpty(data.education[0].school)) {
    errors.school = "Education School  is required";
  }

  if (Validator.isEmpty(data.education[0].degree)) {
    errors.degree = "Education Degree field is required";
  }

  if (Validator.isEmpty(data.education[0].fieldofstudy)) {
    errors.fieldofstudy = "Field of Study field is required";
  }
  if (Validator.isEmpty(data.education[0].from)) {
    errors.from = "Education from  is required";
  }


  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
