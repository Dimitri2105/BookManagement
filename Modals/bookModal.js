const Sequelize = require("sequelize");

const sequelize = require("../Database/database");

const Book = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  publicationYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Book;
