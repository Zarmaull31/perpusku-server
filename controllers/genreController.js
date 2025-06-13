// const Genre = require("../models/genre");

// const getGenre = async (req, res) => {
//   const genreId = req.params.id;

//   Genre.findById(genreId, (err, genre) => {
//     if (err) {
//       return res.status(400).json({ success: false, err });
//     }

//     return res.status(200).json({
//       success: true,
//       genre,
//     });
//   });
// };

// const getAllGenres = async (req, res) => {
//   Genre.find({}, (err, genres) => {
//     if (err) {
//       return res.status(400).json({ success: false, err });
//     }

//     return res.status(200).json({
//       success: true,
//       genresList: genres,
//     });
//   });
// };

// const addGenre = async (req, res) => {
//   const newGenre = req.body;

//   Genre.create(newGenre, (err, genre) => {
//     if (err) {
//       return res.status(400).json({ success: false, err });
//     }

//     return res.status(200).json({
//       success: true,
//       newGenre: genre,
//     });
//   });
// };

// const updateGenre = async (req, res) => {
//   const genreId = req.params.id;
//   const updatedGenre = req.body;

//   Genre.findByIdAndUpdate(genreId, updatedGenre, (err, genre) => {
//     if (err) {
//       return res.status(400).json({ success: false, err });
//     }

//     return res.status(200).json({
//       success: true,
//       updatedGenre: genre,
//     });
//   });
// };

// const deleteGenre = async (req, res) => {
//   const genreId = req.params.id;

//   Genre.findByIdAndDelete(genreId, (err, genre) => {
//     if (err) {
//       return res.status(400).json({ success: false, err });
//     }

//     return res.status(200).json({
//       success: true,
//       deletedGenre: genre,
//     });
//   });
// };

// const findOrCreate = async (req, res) => {
//   const { name } = req.body;
//   if (!name) return res.status(400).json({ message: "Genre name is required" });

//   try {
//     let genre = await Genre.findOne({ name });
//     if (!genre) {
//       genre = new Genre({ name });
//       await genre.save();
//     }
//     res.status(200).json(genre);
//   } catch (error) {
//     console.error("Error in findOrCreate:", error); // Log error di server
//     res.status(500).json({ message: "Server error", error });
//   }
// };



// module.exports = {
//   getGenre,
//   getAllGenres,
//   addGenre,
//   updateGenre,
//   deleteGenre,
//   findOrCreate,
// };

const Genre = require("../models/Genre"); // Perbaikan: 'G' besar

const getGenre = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).json({ success: false, message: "Genre not found" });
        return res.status(200).json({ success: true, genre });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find({});
        return res.status(200).json({ success: true, genresList: genres });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const addGenre = async (req, res) => {
    try {
        const newGenre = new Genre(req.body);
        const savedGenre = await newGenre.save();
        return res.status(201).json({ success: true, newGenre: savedGenre });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const updateGenre = async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGenre) return res.status(404).json({ success: false, message: "Genre not found" });
        return res.status(200).json({ success: true, updatedGenre });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const deleteGenre = async (req, res) => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        if (!deletedGenre) return res.status(404).json({ success: false, message: "Genre not found" });
        return res.status(200).json({ success: true, deletedGenre });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const findOrCreate = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Genre name is required" });
        let genre = await Genre.findOne({ name });
        if (!genre) {
            genre = new Genre({ name });
            await genre.save();
        }
        return res.status(200).json({ success: true, genre });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
  getGenre,
  getAllGenres,
  addGenre,
  updateGenre,
  deleteGenre,
  findOrCreate,
};