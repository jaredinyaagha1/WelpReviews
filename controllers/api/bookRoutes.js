const router = require("express").Router();
const axios = require("axios");
const helpers = require("../../utils/helpers");

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

// GET all users
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
