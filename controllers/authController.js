// // const fs = require('fs');
// // const path = require('path');
// // try {
// //   const files = fs.readdirSync(path.join(__dirname, '../models/'));
// //   console.log('ISI DARI FOLDER MODELS:', files);
// // } catch (e) {
// //   console.log('ERROR SAAT MEMBACA FOLDER MODELS:', e);
// // }
// // === AKHIR KODE DEBUGGING ===

// const User = require('../models/User')
// const passport = require("passport");

// const registerUser = async (req, res) => {
//   User.findOne({email: req.body.email}, (err, user) => {
//     if (err) {
//       return res.status(400).json({success: false, err});
//     }
//     if (user) {
//       return res.status(403).json({success: false, message: "User already exists"});
//     } else {
//       const newUser = new User(req.body);
//       newUser.setPassword(req.body.password);
//       newUser.save((err, user) => {
//         if (err) {
//           return res.status(400).json({success: false, err});
//         }
//         return res.status(201).json({
//           success: true,
//           user
//         });
//       })
//     }
//   })
// }

// const loginUser = async (req, res, next) => {
//   User.findOne({email: req.body.email}, (err, user) => {
//     if (err) {
//       return res.status(500).json({success: false, err});
//     }
//     if (!user) {
//       return res.status(404).json({success: false, message: "User not found"});
//     }
//     if (!user.isValidPassword(req.body.password)) {
//       return res.status(401).json({success: false, message: "Password incorrect"});
//     }
//     passport.authenticate("local", (err, user, info) => {
//       req.logIn(user, (err) => {
//         if (err) {
//           throw err;
//         }
//         return res.status(200).json({
//           success: true,
//           user
//         });
//       });
//     },)(req, res, next);
//   })
// }

// const logoutUser = async (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     // res.redirect('/login');
//   });
//   return res.status(200).json({success: true, message: "User logged out"});
// }

// module.exports = {
//   registerUser,
//   loginUser,
//   logoutUser
// }



// File: controllers/authController.js (VERSI DEBUGGING)

// === KODE DEBUGGING PALING ULTIMATE ===
const fs = require('fs');
const path = require('path');
try {
  // Kita tentukan path absolut ke file User.js
  const userModelPath = path.join(__dirname, '../models/User.js');

  // Kita baca seluruh isi file itu sebagai teks
  const userModelContent = fs.readFileSync(userModelPath, 'utf8');

  // Kita cetak ke log
  console.log('--- MULAI ISI FILE models/User.js ---');
  console.log(userModelContent);
  console.log('--- AKHIR ISI FILE models/User.js ---');

} catch (e) {
  // Jika membaca file saja sudah error, kita akan tahu
  console.log('!!! GAGAL MEMBACA FILE models/User.js !!!', e);
}
// === AKHIR KODE DEBUGGING ===


// Untuk sementara, kita hentikan aplikasi di sini agar tidak lanjut ke error 'Cannot find module'
// Ini sengaja dibuat agar kita bisa fokus melihat hasil log di atas.
// Kita tidak ekspor apa-apa agar aplikasi tidak melakukan apa-apa setelah ini.
module.exports = {};
