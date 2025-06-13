// const mongoose = require('mongoose');

// const genreSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: false
//     }
// });

// const Genre = mongoose.model('Genre', genreSchema); // Membuat model Genre

// module.exports = Genre; // Menyediakan Genre untuk di-import


const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.models.Genre || mongoose.model('Genre', genreSchema);