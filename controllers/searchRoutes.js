const router = require("express").Router();
const helpers = require("../utils/helpers");

router.get("/", async (req, res) => {
  try {
    let query = req.query.q;
    let results = await helpers.getBooks(query);
    res.render("searchResults", { results });
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

router.get("/author", async (req, res) => {
  try {
    let query = req.query.q;
    let results = await helpers.getBooksByAuthor(query);
    res.render("searchResults", { results });
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

router.get("/title", async (req, res) => {
  try {
    let query = req.query.q;
    let results = await helpers.getBooksByTitle(query);
    res.render("searchResults", { results });
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

router.get("/subject", async (req, res) => {
  try {
    let query = req.query.q;
    let results = await helpers.getBooksBySubject(query);
    res.render("searchResults", { results });
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

module.exports = router;
