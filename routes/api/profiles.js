const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load model
const Profile = require("../../models/Profile");

//Load validations
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

// @route GET api/users/test
// @desc Test user
// @access Public
router.post("/profile", passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}

    profileFields.handle = req.body.handle;
    profileFields.company = req.body.company;
    profileFields.website = req.body.website;
    profileFields.location = req.body.location;
    profileFields.status = req.body.status;
    profileFields.skills = req.body.skills;
    profileFields.bio = req.body.bio;
    profileFields.githubusename = req.body.githubusename;
    profileFields.social = {};
    profileFields.social.facebook = req.body.social.facebook;
    profileFields.social.twitter = req.body.social.twitter;
    profileFields.social.youtube = req.body.social.youtube;
    profileFields.user = req.user;



    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            //Update
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            ).then(profile => res.json(profile));
        } else {
            //Create

            //Check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if (profile) {
                    errors.handle = 'That handle already exists';
                    res.status(400).json(errors);
                }

                //Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });


});


router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // res.json({ msg: "Aceptado" });
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);




// @route GET api/users/current
// @desc Return current user
// @access Public


/*VALIDATOR
  if (typeof req.body.skills !== 'undefined'){
  profileFields.skills = req.body.skills.split(',');
  }
  
  //Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;*/


module.exports = router;