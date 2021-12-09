const router = require("express").Router();
const path = require("path");


// This is the 'get' route
router.get('/home', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'home' template
    res.render('home');
  });



module.exports = router;

