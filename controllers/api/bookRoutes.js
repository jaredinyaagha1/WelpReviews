const router = require("express").Router();
const axios = require("axios");

// GET all users
router.get("/:id", async (req, res) => {
  try {
    let url = `https://www.googleapis.com/books/v1/volumes/${req.params.id}&key=${ApiKey}`;
    const resp = await axios.get(url);
    res.status(200).json(resp.data);
  } catch (error) {
    console.log(error);
    res.status(500).json("request failed");
  }
});

module.exports = router;
