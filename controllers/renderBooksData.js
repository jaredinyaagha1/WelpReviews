const router = require("express").Router();
const apiRoutes = require("./api");
const { User } = require("../models");
const withAuth = require("../utils/auth");
const searchRoutes = require("./searchRoutes");
const axios = require("axios");
const index = require("./index");

router.use("/search", searchRoutes);
router.use("/api", apiRoutes);
router.use('./index', index);

router.get("/", async (req, res) => {
  res.render("login");
});


// router.get("/login", (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect("/login");
//     return;
//   }
//   res.render("/");
// });

// // Login route
// router.get('/home', (req, res) => {
//   // If the user is already logged in, redirect to the homepage
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
  
//   res.render('home', { books: [
//     {
//       title: "The Martian",
//       author: "The Martian",
//       description: "The Martian",
//       rating: "The Martian",
//       image: "http://books.google.com/books/content?id=OPAgEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//     },
//     {
//       title: "The Martian",
//       author: "The Martian",
//       description: "The Martian",
//       rating: "The Martian",
//       image: "http://books.google.com/books/content?id=OPAgEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//     }
//   ]});
// });


// module.exports = router;