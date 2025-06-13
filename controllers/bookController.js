// const Book = require('../models/book')
// const mongoose = require("mongoose");

// const getBook = async (req, res) => {
//   const bookId = req.params.id;

//   Book.findById(bookId, (err, book) => {
//     if (err) {
//       return res.status(400).json({success: false, err});
//     }

//     return res.status(200).json({
//       success: true,
//       book
//     });
//   });
// }

// const getAllBooks = async (req, res) => {
//   Book.aggregate([{
//     $lookup: {
//       from: "authors",
//       localField: "authorId",
//       foreignField: "_id",
//       as: "author"
//     },
//   },
//     {
//       $unwind: "$author"
//     },
//     {
//       $lookup: {
//         from: "genres",
//         localField: "genreId",
//         foreignField: "_id",
//         as: "genre"
//       },

//     },
//     {
//       $unwind: "$genre"
//     },]).exec((err, books) => {
//     if (err) {
//       return res.status(400).json({success: false, err});
//     }

//     return res.status(200).json({
//       success: true,
//       booksList: books
//     });
//   });
// }

// const addBook = async (req, res) => {
//   const newBook = {
//     ...req.body,
//     genreId: mongoose.Types.ObjectId(req.body.genreId),
//     authorId: mongoose.Types.ObjectId(req.body.authorId)
//   }
//   console.log(newBook)
//   Book.create(newBook, (err, book) => {
//     if (err) {
//       return res.status(400).json({success: false, err});
//     }

//     return res.status(200).json({
//       success: true,
//       newBook: book
//     });
//   })
// }

// const updateBook = async (req, res) => {
//   const bookId = req.params.id
//   const updatedBook = req.body

//   Book.findByIdAndUpdate(bookId, updatedBook, (err, book) => {
//     if (err) {
//       return res.status(400).json({success: false, err});
//     }

//     return res.status(200).json({
//       success: true,
//       updatedBook: book
//     });
//   })
// }

// const deleteBook = async (req, res) => {
//   const bookId = req.params.id

//   Book.findByIdAndDelete(bookId, (err, book) => {
//     if (err) {
//       return res.status(400).json({success: false, err});
//     }

//     return res.status(200).json({
//       success: true,
//       deletedBook: book
//     });
//   })
// }

// module.exports = {
//   getBook,
//   getAllBooks,
//   addBook,
//   updateBook,
//   deleteBook
// }

const Book = require("../models/Book"); // Perbaikan: 'B' besar
const mongoose = require("mongoose");

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authorId")
      .populate("genreId");
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    return res.status(200).json({ success: true, book });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate("authorId").populate("genreId");
    return res.status(200).json({ success: true, booksList: books });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    return res.status(201).json({ success: true, newBook: savedBook });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    return res.status(200).json({ success: true, updatedBook });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    return res.status(200).json({ success: true, deletedBook });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

module.exports = {
  getBook,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};
