// const Borrowal = require('../models/borrowal')
// const mongoose = require("mongoose");
// const Book = require("../models/book");

// const getBorrowal = async (req, res) => {
//     const borrowalId = req.params.id;

//     Borrowal.findById(borrowalId, (err, borrowal) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             borrowal
//         });
//     });
// }

// const getAllBorrowals = async (req, res) => {
//     Borrowal.aggregate([{
//         $lookup: {
//             from: "users",
//             localField: "memberId",
//             foreignField: "_id",
//             as: "member"
//         },
//     },
//         {
//             $unwind: "$member"
//         },]).exec((err, borrowals) => {
//         if (err) {
//             return res.status(400).json({success: false, err});
//         }

//         return res.status(200).json({
//             success: true,
//             borrowalsList: borrowals
//         });
//     })
// }

// const addBorrowal = async (req, res) => {
//     const newBorrowal = {
//         ...req.body,
//         memberId: mongoose.Types.ObjectId(req.body.memberId),
//         bookId: mongoose.Types.ObjectId(req.body.bookId)
//     }

//     Borrowal.create(newBorrowal, (err, borrowal) => {
//         if (err) {
//             return res.status(400).json({success: false, err});
//         }

//         Book.findByIdAndUpdate(newBorrowal.bookId, {isAvailable: false}, (err, book) => {
//             if (err) {
//                 return res.status(400).json({success: false, err});
//             }

//             return res.status(200).json({
//                 success: true,
//                 newBorrowal: borrowal
//             });
//         });
//     })
// }

// const updateBorrowal = async (req, res) => {
//     const borrowalId = req.params.id
//     const updatedBorrowal = req.body

//     Borrowal.findByIdAndUpdate(borrowalId,updatedBorrowal, (err, borrowal) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             updatedBorrowal: borrowal
//         });
//     })
// }

// const deleteBorrowal = async (req, res) => {
//     const borrowalId = req.params.id

//     Borrowal.findByIdAndDelete(borrowalId, (err, borrowal) => {
//         if (err) {
//             return res.status(400).json({success: false, err});
//         }

//         Book.findByIdAndUpdate(borrowal.bookId, {isAvailable: true}, (err, book) => {
//             if (err) {
//                 return res.status(400).json({success: false, err});
//             }

//             return res.status(200).json({
//                 success: true,
//                 deletedBorrowal: borrowal
//             });
//         });
//     })
// }

// module.exports = {
//     getBorrowal,
//     getAllBorrowals,
//     addBorrowal,
//     updateBorrowal,
//     deleteBorrowal
// }


const Borrowal = require('../models/Borrowal'); // Perbaikan: 'B' besar
const Book = require("../models/Book");       // Perbaikan: 'B' besar
const mongoose = require("mongoose");

const getBorrowal = async (req, res) => {
    try {
        const borrowal = await Borrowal.findById(req.params.id).populate('memberId').populate('bookId');
        if (!borrowal) return res.status(404).json({ success: false, message: "Borrowal not found" });
        return res.status(200).json({ success: true, borrowal });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const getAllBorrowals = async (req, res) => {
    try {
        const borrowals = await Borrowal.find({}).populate('memberId').populate('bookId');
        return res.status(200).json({ success: true, borrowalsList: borrowals });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const addBorrowal = async (req, res) => {
    try {
        const newBorrowal = new Borrowal({
            memberId: req.body.memberId,
            bookId: req.body.bookId,
            status: 'BORROWED'
        });
        const savedBorrowal = await newBorrowal.save();
        await Book.findByIdAndUpdate(req.body.bookId, { isAvailable: false });
        return res.status(201).json({ success: true, newBorrowal: savedBorrowal });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const updateBorrowal = async (req, res) => {
    try {
        const updatedBorrowal = await Borrowal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBorrowal) return res.status(404).json({ success: false, message: "Borrowal not found" });
        return res.status(200).json({ success: true, updatedBorrowal });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const deleteBorrowal = async (req, res) => {
    try {
        const deletedBorrowal = await Borrowal.findByIdAndDelete(req.params.id);
        if (!deletedBorrowal) return res.status(404).json({ success: false, message: "Borrowal not found" });
        await Book.findByIdAndUpdate(deletedBorrowal.bookId, { isAvailable: true });
        return res.status(200).json({ success: true, deletedBorrowal });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

module.exports = {
    getBorrowal,
    getAllBorrowals,
    addBorrowal,
    updateBorrowal,
    deleteBorrowal
};