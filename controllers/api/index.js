const router = require("express").Router();
const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
