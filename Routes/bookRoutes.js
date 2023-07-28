const express = require("express");

const Book = require("../Modals/bookModal");
const { where, Sequelize } = require("sequelize");

const router = express.Router();


//working
router.get("/books", async (req, res) => {
  const page = parseInt(req.query.page || 2);
  const Items_Per_Page = parseInt(req.query.limit || 2);
  try {
    let count = await Book.count();

    const books = await Book.findAll({
      offset: (page - 1) * Items_Per_Page,
      limit: Items_Per_Page,
    });
    res.status(200).json({
      books,
      info: {
        currentPage: page,
        hasNextPage: count > page * Items_Per_Page,
        hasPreviousPage: page > 1,
        nextPage: +page + 1,
        previuosPage: +page - 1,
        lastPage: Math.ceil(count / Items_Per_Page),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//working
router.get("/books/:id", async (req, res, next) => {
  const bookId = req.params.id;

  const book = await Book.findOne({ where: { id: bookId } });
  if (!book) {
    return res.status(400).json({ message: "Book Not Found " });
  }
  res.status(200).json({ book, message: "Book Found " });
});

//working
router.post("/books", async (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const publicationYear = req.body.publicationYear;

  if (!title || !author || !description || !publicationYear) {
    return res.status(400).json({ message: "Fill all fields" });
  }
  try {
    const book = await Book.create({
      title: title,
      author: author,
      description: description,
      publicationYear: publicationYear,
    });
    res.status(201).json({ book, message: "Book Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//working
router.put("/books/:id", async (req, res, next) => {
  const bookId = req.params.id;

  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const publicationYear = req.body.publicationYear;

  if (!title || !author || !description || !publicationYear) {
    return res.status(400).json({ message: "Fill all fields" });
  }
  try {
    const book = await Book.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(400).json({ message: "No book to update " });
    }
    const updatedBook = await Book.update(
      {
        title: title,
        author: author,
        description: description,
        publicationYear: publicationYear,
      },
      {
        where: { id: bookId },
      }
    );
    res.status(200).json({ updatedBook, message: "Book updated !!! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//working
router.delete("/books/:id", async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findOne({ where: { id: bookId } });
    if (!book) {
      return res.status(400).json({ message: "No book to delete " });
    }
    const deleteBook = await book.destroy();
    res.status(200).json({ deleteBook, message: "Book deleted !!! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


//working
router.get("/books/search", async (req, res, next) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: "No book Found !! " });
  }
  try {
    const book = await Book.findAll({
      where: {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${query}%` } },
          { author: { [Sequelize.Op.like]: `%${query}%` } },
          { description: { [Sequelize.Op.like]: `%${query}%` } },
        ],
      },
    });
    res.status(200).json({ book, message: "Books searched successfully !!! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
