// const mongoose = require('mongoose')

// const bookReturnSchema = new mongoose.Schema({
//   memberId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   bookName: {
//     type: String,
//     required: true
//   },
//     dueDate: {
//         type: Date,
//         required: false
//     },
//     status: {
//         type: String,
//         required: true
//     },
// }, 
//   { timestamps: true }
// );

// // module.exports = mongoose.model('bookReturn', bookReturnSchema)

// module.exports = mongoose.models.bookReturn || mongoose.model('BookReturn', bookReturnSchema);
const mongoose = require('mongoose');

const bookReturnSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: { // Sebaiknya pakai bookId, bukan bookName
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  dueDate: {
      type: Date,
      required: false
  },
  status: {
      type: String,
      enum: ['LATE', 'ON_TIME'],
      required: true
  },
}, { timestamps: true });

module.exports = mongoose.models.BookReturn || mongoose.model('BookReturn', bookReturnSchema);