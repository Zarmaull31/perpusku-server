// const mongoose = require('mongoose')

// const authorSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: false
//     },
//     photoUrl: {
//         type: String,
//         required: false
//     }
// })

// module.exports = mongoose.model('Author', authorSchema)

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    }
}, { timestamps: true }); // Tambahkan timestamps untuk created/updated date

module.exports = mongoose.models.Author || mongoose.model('Author', authorSchema);