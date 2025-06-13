// // Import required modules
// const express = require("express")
// const router = express.Router();
// const BookReturn = require('../models/bookReturn'); // ⬅️ INI WAJIB


// // Import functions from controller
// const {
//     getReturn,
//     getAllReturns,
//     addReturn,
//     updateReturn,
//     deleteReturn
// } = require('../controllers/bookReturnController')

// router.get("/getAll", (req, res) => getAllReturns(req,res))

// router.get("/get/:id", (req, res) => getReturn(req, res))

// router.post("/add", (req, res) => addReturn(req, res))

// router.put("/update/:id", (req, res) => updateReturn(req, res))

// router.delete("/delete/:id", (req, res) => deleteReturn(req, res))

// // TAMBAHHAN BARU
// router.get("/total", async (req, res) => {
//     try {
//       const total = await BookReturn.countDocuments();
//       res.json({ total });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Gagal mengambil total pengembalian buku" });
//     }
//   });

// module.exports = router;

const express = require("express");
const router = express.Router();

// Memuat fungsi dari bookReturnController
const {
    getReturn,
    getAllReturns,
    addReturn,
    updateReturn,
    deleteReturn
} = require('../controllers/bookReturnController');

// Menggunakan penulisan yang ringkas
router.get("/getAll", getAllReturns);
router.get("/get/:id", getReturn);
router.post("/add", addReturn);
router.put("/update/:id", updateReturn);
router.delete("/delete/:id", deleteReturn);

module.exports = router;