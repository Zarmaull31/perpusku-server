// // Import required modules
// const express = require("express")
// const router = express.Router();


// const User = require('../models/User'); // ⬅️ INI WAJIB
// // Import functions from controller
// const {
//   getUser,
//   getAllUsers,
//   getAllMembers,
//   addUser,
//   updateUser,
//   deleteUser
// } = require('../controllers/userController')

// router.get("/getAll", (req, res) => getAllUsers(req, res))

// router.get("/getAllMembers", (req, res) => getAllMembers(req, res))

// router.get("/get/:id", (req, res) => getUser(req, res))

// router.post("/add", (req, res) => addUser(req, res))

// router.put("/update/:id", (req, res) => updateUser(req, res))

// router.delete("/delete/:id", (req, res) => deleteUser(req, res))

// module.exports = router;

const express = require("express");
const router = express.Router();

// Memuat fungsi dari userController
const {
  getUser,
  getAllUsers,
  getAllMembers,
  addUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Menggunakan penulisan yang ringkas
router.get("/getAll", getAllUsers);
router.get("/getAllMembers", getAllMembers);
router.get("/get/:id", getUser);
router.post("/add", addUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
