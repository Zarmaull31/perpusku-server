const express = require('express');
const router = express.Router();
const Borrowal = require('../models/Borrowal'); // pastikan ada model ini

// Endpoint untuk hitung jumlah dokumen pinjaman buku
router.get('/total', async (req, res) => {
  try {
    const total = await Borrowal.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pinjaman' });
  }
});

module.exports = router;
