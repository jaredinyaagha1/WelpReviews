const router = require("express").Router();
const auth = require("../../utils/auth");
const { User, Review } = require("../../models");

router.post("/", auth.withAuthAdd, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    }); // Fetches the current user that is logged in, as a database object
    let review = req.body.review || null;
    console.log(review);
    if (review === null) {
      res.status(400).json({ message: "You must enter text for the review" });
      return;
      g;
    }
    review = await Review.create({
      title: req.body.title,
      description: req.body.review,
    });
    userData.addReviews([review]);
    res.status(201).json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
