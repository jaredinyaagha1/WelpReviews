const router = require("express").Router();
const axios = require("axios");
const helpers = require("../../utils/helpers");
const auth = require("../../utils/auth");
const { User, Book } = require("../../models");

router.post("/", auth.withAuthAdd, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    }); // Fetches the current user that is logged in, as a database object
    let rating = req.body.rating || null;
    let totalRatings = req.body.totalRatings || null;
    let thumbnail = req.body.thumbnail || null;
    let book = await Book.findOne({ where: { title: req.body.title } });
    if (book === null) {
      book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        rating: rating,
        total_ratings: totalRatings,
        thumbnail: thumbnail,
      });
    }
    userData.addBooks([book], {
      through: { reading_status: req.body.readingStatus },
    });
    res.status(201).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/author", async (req, res) => {
  try {
    let name = req.query.name;
    let results = await helpers.getBooksByAuthor(name);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let url = `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
    const resp = await axios.get(url);
    res.status(200).json(resp.data);
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});



module.exports = router;
