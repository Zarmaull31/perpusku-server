// const mongoose = require('mongoose')

// const borrowalSchema = new mongoose.Schema({
//   memberId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   bookName: {
//     type: String,
//     required: true
//   },
//     borrowedDate: {
//         type: Date,
//         required: false
//     },
//     status: {
//         type: String,
//         required: true
//     },
// }, 
//  { timestamps: true }
// );

// // module.exports = mongoose.model('Borrowal', borrowalSchema)

// module.exports = mongoose.models.Borrowal || mongoose.model('Borrowal', borrowalSchema);

const mongoose = require('mongoose');

const borrowalSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referensi ke model User
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Referensi ke model Book
    required: true
  },
  status: {
    type: String,
    enum: ['BORROWED', 'RETURNED'],
    default: 'BORROWED',
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.models.Borrowal || mongoose.model('Borrowal', borrowalSchema);