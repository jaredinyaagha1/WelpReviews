const router = require("express").Router();
const apiRoutes = require("./api");
const { User } = require("../models");
const auth = require("../utils/auth");
const searchRoutes = require("./searchRoutes");

router.use("/search", searchRoutes);
router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  res.render("login");
});

router.get("/profile", auth.withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    }); // Fetches the current user that is logged in, as a database object
    const user = userData.get({ plain: true }); // Converts database object into plain object
    res.render("profile", {
      ...user, // Spreads the user object into multiple variables (id and email)
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
