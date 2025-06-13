// const mongoose = require('mongoose')

// const reviewSchema = new mongoose.Schema({
//     bookID: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
//     star: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: String,
//         required: false
//     }
   
// })

// module.exports = mongoose.model('Review', reviewSchema)


const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookId: { // Sebaiknya bookId, bukan bookID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: { // Tambahkan userId untuk tahu siapa yang mereview
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    star: {
        type: Number, // Bintang sebaiknya angka
        min: 1,
        max: 5,
        required: true
    },
    comment: { // Ganti 'rating' menjadi 'comment' agar lebih jelas
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);