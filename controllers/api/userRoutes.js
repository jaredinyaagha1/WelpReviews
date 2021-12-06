const router = require("express").Router();
const { User } = require("../../models");
const { ValidationError } = require("sequelize");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    console.log(newUser);
    try {
      const currentUser = await User.checkIfExists(newUser.email);
      if (currentUser != null) {
        res.status(400).json({ message: "alreadyExists" });
        return;
      }
      const userData = await User.create(newUser);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json({ message: "You are now logged in!" });
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({ message: err.errors[0].path });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
