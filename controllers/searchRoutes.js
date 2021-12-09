const router = require("express").Router();
const helpers = require("../utils/helpers");

router.get("/", async (req, res) => {
  try {
    let query = req.query.q;
    let category = req.query.category;
    let results = null;
    if (category === "author") {
      results = await helpers.getBooksByAuthor(query);
    } else if (category === "title") {
      results = await helpers.getBooksByTitle(query);
    } else if (category === "subject") {
      results = await helpers.getBooksBySubject(query);
    } else if (category === undefined) {
      results = await helpers.getBooks(query);
    }
    if (results != null) {
      res.render("searchResults", { results });
    } else {
      res.status(404).json("Cannot find page at this resource");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

module.exports = router;
