const User = require("./User");
const Book = require("./Book");
const Review = require("./Review");

User.hasMany(Review, {
    foreignKey: 'user_id',
    name: 'userReviews',
    onDelete: 'CASCADE'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Review };
