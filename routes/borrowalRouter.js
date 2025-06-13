// // Import required modules
// const express = require("express")
// const router = express.Router();

// // Import functions from controller
// const {
//     getBorrowal,
//     getAllBorrowals,
//     addBorrowal,
//     updateBorrowal,
//     deleteBorrowal
// } = require('../controllers/BorrowalController')

// router.get("/getAll", (req, res) => getAllBorrowals(req,res))

// router.get("/get/:id", (req, res) => getBorrowal(req, res))

// router.post("/add", (req, res) => addBorrowal(req, res))

// router.put("/update/:id", (req, res) => updateBorrowal(req, res))

// router.delete("/delete/:id", (req, res) => deleteBorrowal(req, res))

// module.exports = router;

// Import required modules
const express = require("express");
const router = express.Router();

// Import functions from controller
// Path ini sudah benar, memastikan nama file controller adalah 'BorrowalController.js'
const {
    getBorrowal,
    getAllBorrowals,
    addBorrowal,
    updateBorrowal,
    deleteBorrowal
} = require('../controllers/BorrowalController');

// Penyesuaian: Langsung memanggil fungsi controllernya. Ini lebih ringkas.
router.get("/getAll", getAllBorrowals);

router.get("/get/:id", getBorrowal);

router.post("/add", addBorrowal);

router.put("/update/:id", updateBorrowal);

router.delete("/delete/:id", deleteBorrowal);

module.exports = router;