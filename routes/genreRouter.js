// // Import required modules
// const express = require("express")

// const router = express.Router();
// const genreController = require('../controllers/genreController');
// const Genre = require("../models/genre"); // atau sesuaikan path-nya



// // Import functions from controller
// const {
//     getGenre,
//     getAllGenres,
//     addGenre,
//     updateGenre,
//     deleteGenre
// } = require('../controllers/genreController')

// router.get("/getAll", (req, res) => getAllGenres(req,res))   

// router.get("/get/:id", (req, res) => getGenre(req, res))

// router.post("/add", (req, res) => addGenre(req, res))

// router.put("/update/:id", (req, res) => updateGenre(req, res))

// router.delete("/delete/:id", (req, res) => deleteGenre(req, res))

// // Menambahkan route untuk findOrCreate
// // router.post('/findOrCreate', genreController.findOrCreate);
// router.post("/findOrCreate", async (req, res) => {
//      console.log("BODY DITERIMA SERVER:", req.body); 
//   try {
//     const { name } = req.body;

//     if (!name || name.trim() === "") {
//       return res.status(400).json({ message: "Genre name is required" });
//     }

//     let genre = await Genre.findOne({ name: name.trim() });

//     if (!genre) {
//       genre = await Genre.create({ name: name.trim() });
//     }

//     return res.status(200).json({ genre });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();

// Memuat fungsi dari genreController
const {
    getGenre,
    getAllGenres,
    addGenre,
    updateGenre,
    deleteGenre,
    findOrCreate
} = require('../controllers/genreController');

// Menggunakan penulisan yang ringkas
router.get("/getAll", getAllGenres);
router.get("/get/:id", getGenre);
router.post("/add", addGenre);
router.post("/findOrCreate", findOrCreate);
router.put("/update/:id", updateGenre);
router.delete("/delete/:id", deleteGenre);

module.exports = router;