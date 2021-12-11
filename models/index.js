const User = require("./User");
const Book = require("./Book");
const Review = require("./Review");
const sequelize = require("../config/connection");
const { DataTypes } = require("sequelize");

UserBook = sequelize.define("user_book", {
  reading_status: DataTypes.STRING,
});

User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Book, {
  through: UserBook,
});

Book.belongsToMany(User, {
  through: UserBook,
});

module.exports = {
  User,
  Book,
  Review,
};
