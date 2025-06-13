// const Author = require('../models/author')

// //read
// const getAuthor = async (req, res) => {
//     const authorId = req.params.id;

//     Author.findById(authorId, (err, author) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             author
//         });
//     });
// }

// const getAllAuthors = async (req, res) => {
//     Author.find({}, (err, authors) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             authorsList: authors
//         });
//     })
// }

// //create
// const addAuthor = async (req, res) => {
//     const newAuthor = req.body

//     Author.create(newAuthor, (err, author) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             newAuthor: author
//         });
//     })
// }

// //update
// const updateAuthor = async (req, res) => {
//     const authorId = req.params.id
//     const updatedAuthor = req.body

//     Author.findByIdAndUpdate(authorId, updatedAuthor, (err, author) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             updatedAuthor: author
//         });
//     })
// }

// //delete
// const deleteAuthor = async (req, res) => {
//     const authorId = req.params.id

//     Author.findByIdAndDelete(authorId, (err, author) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             deletedAuthor: author
//         });
//     })
// }

// // authorController.js BARU GW TAMBAHKAN

// const findOrCreateAuthor = async (req, res) => {
//   const { name } = req.body;
//   let author = await Author.findOne({ name });
//   if (!author) {
//     author = new Author({ name });
//     await author.save();
//   }
//   res.json({ author });
// };

// module.exports = {
//     getAuthor,
//     getAllAuthors,
//     addAuthor,
//     updateAuthor,
//     deleteAuthor,
//     findOrCreateAuthor
// }

const Author = require("../models/Author"); // Perbaikan: 'A' besar

const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author)
      return res
        .status(404)
        .json({ success: false, message: "Author not found" });
    return res.status(200).json({ success: true, author });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    return res.status(200).json({ success: true, authorsList: authors });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const addAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    const savedAuthor = await newAuthor.save();
    return res.status(201).json({ success: true, newAuthor: savedAuthor });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAuthor)
      return res
        .status(404)
        .json({ success: false, message: "Author not found" });
    return res.status(200).json({ success: true, updatedAuthor });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor)
      return res
        .status(404)
        .json({ success: false, message: "Author not found" });
    return res.status(200).json({ success: true, deletedAuthor });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
};

const findOrCreateAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    let author = await Author.findOne({ name });
    if (!author) {
      author = new Author({ name });
      await author.save();
    }
    res.status(200).json({ success: true, author });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

module.exports = {
  getAuthor,
  getAllAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  findOrCreateAuthor,
};
