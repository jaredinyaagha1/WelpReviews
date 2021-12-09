const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/");
  } else {
    next();
  }
};

const withAuthAdd = (req, res, next) => {
  if (!req.session.logged_in) {
    res
      .status(401)
      .json({
        message: "Must be logged in in order to save book to a reading list",
      });
  } else {
    next();
  }
};

module.exports = { withAuth, withAuthAdd };
