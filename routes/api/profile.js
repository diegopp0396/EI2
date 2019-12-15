const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validations/profile");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email", "avatar"])
      .then(profile => {
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    console.log("[PROFILEREQUEST]"+JSON.stringify(req.body));

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = req.body.handle ? req.body.handle : "";
    profileFields.company = req.body.company ? req.body.company : "";
    profileFields.website = req.body.website ? req.body.website : "";
    profileFields.location = req.body.location ? req.body.location : "";
    profileFields.bio = req.body.bio ? req.body.bio : "";
    profileFields.status = req.body.status ? req.body.status : "";
    profileFields.githubusername = req.body.githubusername ? req.body.githubusername : "";

    // Skills - Split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    profileFields.social.youtube = req.body.social.youtube ? req.body.social.youtube : "";
    profileFields.social.twitter = req.body.social.twitter ? req.body.social.twitter : "";
    profileFields.social.facebook = req.body.social.facebook ? req.body.social.facebook : "";
    profileFields.social.linkedin = req.body.social.linkedin ? req.body.social.linkedin : "";
    profileFields.social.instagram = req.body.social.instagram ? req.body.social.instagram : "";

    //Education
    profileFields.education = []
    const edu = {
      school: req.body.school ? req.body.education.school : "",
      degree: req.body.degree ? req.body.education.degree : "",
      fieldofstudy: req.body.fieldofstudy ? req.body.education.fieldofstudy : "",
      from: req.body.from ? req.body.education.from : new Date(),
      to: req.body.to ? req.body.education.to : new Date(),
      current: req.body.education.current ? true : false,
      description: req.body.education.description ? req.body.description : ""
    }

    profileFields.education.unshift(edu);

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profilee => {
          if (profilee) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    //if (!isValid) {
    // Return any errors with 400 status
    //return res.status(400).json(errors);
    //}

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };


      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save()
      .then(profile => {
        res.json(profile)
      })
      .catch(err => {
        res.status(400).json(err)
      });
    })
    .catch(err =>{
      res.status(400).json(err)
    });
  }
);

module.exports = router;
