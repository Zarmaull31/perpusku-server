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
});

const Genre = mongoose.model('Genre', genreSchema); // Membuat model Genre

module.exports = Genre; // Menyediakan Genre untuk di-import
