const express = require('express');
const router = express.Router();

const Borrowal = require('../models/Borrowal');     // model peminjaman
const BookReturn = require('../models/BookReturn'); // model pengembalian
const User = require('../models/User');             // model user

// Helper untuk format tanggal jadi yyyy-mm-dd
const formatDate = (date) => date.toISOString().split('T')[0];

// Endpoint statistik harian
router.get('/harian', async (req, res) => {
  try {
    const start = new Date();
    start.setDate(start.getDate() - 10); // ambil 10 hari terakhir

    const end = new Date();
    
    // Inisialisasi struktur data
    const result = {};

    // Loop 10 hari ke belakang dan isi dengan 0 dulu
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = formatDate(d);
      result[key] = { date: key, pinjam: 0, kembali: 0, user: 0 };
    }

    // Ambil data pinjam
    const borrowals = await Borrowal.find({ createdAt: { $gte: start, $lte: end } });
    borrowals.forEach(b => {
      const key = formatDate(b.createdAt);
      if (result[key]) result[key].pinjam += 1;
    });

    // Ambil data kembali
    const returns = await BookReturn.find({ createdAt: { $gte: start, $lte: end } });
    returns.forEach(r => {
      const key = formatDate(r.createdAt);
      if (result[key]) result[key].kembali += 1;
    });

    // Ambil data user
    const users = await User.find({ createdAt: { $gte: start, $lte: end } });
    users.forEach(u => {
      const key = formatDate(u.createdAt);
      if (result[key]) result[key].user += 1;
    });

    res.json(Object.values(result)); // ubah ke array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil statistik harian" });
  }
});

module.exports = router;
