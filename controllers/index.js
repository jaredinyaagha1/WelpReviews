const router = require("express").Router();
const apiRoutes = require("./api");
const { User } = require("../models");
const withAuth = require("../utils/auth");
const searchRoutes = require("./searchRoutes");

router.use("/search", searchRoutes);
router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  res.render("login");
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("profile", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  res.render("/");
});

// Login route
router.get('/home', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('home');
});


// Login route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('signup');
});


module.exports = router;
