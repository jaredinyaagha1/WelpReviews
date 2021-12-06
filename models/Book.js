const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        book_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        total_Rating: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'location'
      }
    );
    
    module.exports = Book;
    