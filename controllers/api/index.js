const router = require("express").Router();
const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");

router.use("/books", bookRoutes);
router.use("/users", userRoutes);

module.exports = router;
