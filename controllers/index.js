const router = require("express").Router();
const apiRoutes = require("./api");
const { User } = require("../models");
const auth = require("../utils/auth");
const searchRoutes = require("./searchRoutes");
const moment = require("moment");

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
router.get("/home", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("home");
});

// Login route
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("signup");
});

router.get("/have-read", auth.withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    let bookData = await userData.getBooks({
      through: { where: { reading_status: "Have Read" } },
    });
    let books = bookData.map((book) => book.get({ plain: true }));
    res.render("books", { books });
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

router.get("/currently-reading", auth.withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    let bookData = await userData.getBooks({
      through: { where: { reading_status: "Reading" } },
    });
    let books = bookData.map((book) => book.get({ plain: true }));
    res.render("books", { books });
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

router.get("/want-to-read", auth.withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    let bookData = await userData.getBooks({
      through: { where: { reading_status: "Want To Read" } },
    });
    let books = bookData.map((book) => book.get({ plain: true }));
    res.render("books", { books });
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

// Browse route
router.get("/browse", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("browse");
});

router.get("/my-reviews", auth.withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    let reviewData = await userData.getReviews({
      order: [["date_created", "DESC"]],
    });
    let reviews = reviewData.map((review) => review.get({ plain: true }));
    reviews.map((review) => {
      review.date_created = moment(review.date_created).format(
        "MM/DD/YYYY h:mm:ss"
      );
      return review;
    });
    res.render("myreviews", { reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

module.exports = router;
