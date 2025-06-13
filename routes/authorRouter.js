// Import required modules
const express = require("express")
const router = express.Router();
const authorController = require('../controllers/authorController');  // Pastikan path ini sesuai dengan struktur folder Anda


// Import functions from controller
const {
    getAuthor,
    getAllAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController')

router.get("/getAll", (req, res) => getAllAuthors(req, res))

router.get("/get/:id", (req, res) => getAuthor(req, res))

router.post("/add", (req, res) => addAuthor(req, res))

router.put("/update/:id", (req, res) => updateAuthor(req, res))

router.delete("/delete/:id", (req, res) => deleteAuthor(req, res))

// Rute baru untuk findOrCreateAuthor
router.post('/findOrCreate', authorController.findOrCreateAuthor);  // Menambahkan rute untuk fungsi findOrCreateAuthor


module.exports = router;
