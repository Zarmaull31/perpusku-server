// const mongoose = require('mongoose')

// const bookSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   isbn: {
//     type: String,
//     required: true
//   },
//   authorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: false
//   },
//   genreId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: false
//   },
//   isAvailable: {
//     type: Boolean,
//     required: true
//   },
//   brokenBook: {
//     type: String,
//     required: true
//   },
//   goodBook: {
//     type: String,
//     required: true
//   },
//   publishYear: {
//     type: String,
//     required: true
//   },
//   summary: {
//     type: String,
//     required: false
//   },
//   photoUrl: {
//     type: String,
//     required: false
//   }
// })

// module.exports = mongoose.model('Book', bookSchema)


const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Referensi ke model Author
    required: true
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre', // Referensi ke model Genre
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true,
    required: true
  },
  stock: { // Menggunakan 'stock' lebih umum daripada good/broken
    type: Number,
    required: true,
    default: 1
  },
  publishYear: {
    type: String, // Sebaiknya Number, tapi kita ikuti yang ada dulu
    required: true
  },
  summary: {
    type: String,
    required: false
  },
  photoUrl: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);