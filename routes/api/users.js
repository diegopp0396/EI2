const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load model
const User = require("../../models/User");

//Load validations
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

// @route GET api/users/test
// @desc Test user
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route POST api/users/testres
// @desc Test user
// @access Public
router.post("/testres", (req, res) => res.json({ msg: "Users Works" }));

// @route GET api/users/register
// @desc Register user using model
// @access Public
router.post("/register", (req, res) => {
  const { erross, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(erross);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      //10 es el numero de veces que busca un numero no repetido
      //salt es el numero encontrado
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/test
// @desc Test user
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      erross.mail = "Email incorrect";
      return res.status(404).json({ email: "Email Not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //Usuario
        //Usuario
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        //Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );

        ///res.json({ msg: "Se encontro la contraseña" });
      } else {
        erross.password = "Password incorrect";
        return res.status(404).json(erross);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current user
// @access Public
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
module.exports = router;
