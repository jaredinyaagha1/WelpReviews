const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'welp_db',
    'root',
    'FullStackFun',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = sequelize;