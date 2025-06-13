// // Import required modules
// const express = require("express")
// const router = express.Router();

// // Import functions from controller
// const {
//     getReview,
//     getAllReviews,
//     addReview,
//     updateReview,
//     deleteReview
// } = require('../controllers/reviewController')

// router.get("/getAll", (req, res) => getAllReviews(req,res))   

// router.get("/get/:id", (req, res) => getReview(req, res))

// router.post("/add", (req, res) => addReview(req, res))

// router.put("/update/:id", (req, res) => updateReview(req, res))

// router.delete("/delete/:id", (req, res) => deleteReview(req, res))

// module.exports = router;


const express = require("express");
const router = express.Router();

// Memuat fungsi dari reviewController
const {
    getReview,
    getAllReviews,
    addReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

// Menggunakan penulisan yang ringkas
router.get("/getAll", getAllReviews);
router.get("/get/:id", getReview);
router.post("/add", addReview);
router.put("/update/:id", updateReview);
router.delete("/delete/:id", deleteReview);

module.exports = router;