// const bookReturn = require('../models/BookReturn')
// const mongoose = require("mongoose");
// const Book = require("../models/Book");

// const getReturn = async (req, res) => {
//     const returnId = req.params.id;

//     bookReturn.findById(returnId, (err, returnBook) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             returnBook
//         });
//     });
// }

// const getAllReturns = async (req, res) => {
//     bookReturn.aggregate([{
//         $lookup: {
//             from: "users",
//             localField: "memberId",
//             foreignField: "_id",
//             as: "member"
//         },
//     },
//         {
//             $unwind: "$member"
//         },]).exec((err, returns) => {
//         if (err) {
//             return res.status(400).json({success: false, err});
//         }

//         return res.status(200).json({
//             success: true,
//             returnsList: returns
//         });
//     })
// }

// const addReturn = async (req, res) => {
//     const newReturn = {
//         ...req.body,
//         memberId: mongoose.Types.ObjectId(req.body.memberId),
//         bookId: mongoose.Types.ObjectId(req.body.bookId)
//     }

//     bookReturn.create(newReturn, (err, returnBook) => {
//         if (err) {
//             return res.status(400).json({success: false, err});
//         }

//         Book.findByIdAndUpdate(newReturn.bookId, {isAvailable: false}, (err, book) => {
//             if (err) {
//                 return res.status(400).json({success: false, err});
//             }

//             return res.status(200).json({
//                 success: true,
//                 newReturn: returnBook
//             });
//         });
//     })
// }

// const updateReturn = async (req, res) => {
//     const returnId = req.params.id
//     const updatedReturn = req.body

//     bookReturn.findByIdAndUpdate(returnId,updatedReturn, (err, returnBook) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             updatedReturn: returnBook
//         });
//     })
// }

// const deleteReturn = async (req, res) => {
//     const returnId = req.params.id

//     bookReturn.findByIdAndDelete(returnId, (err, returnBook) => {
//         if (err) {
//             return res.status(400).json({success: false, err});
//         }

//         Book.findByIdAndUpdate(returnBook.bookId, {isAvailable: true}, (err, book) => {
//             if (err) {
//                 return res.status(400).json({success: false, err});
//             }

//             return res.status(200).json({
//                 success: true,
//                 deletedReturn: returnBook
//             });
//         });
//     })
// }

// module.exports = {
//     getReturn,
//     getAllReturns,
//     addReturn,
//     updateReturn,
//     deleteReturn
// }



const BookReturn = require('../models/BookReturn'); // Perbaikan: 'B' dan 'R' besar
const Book = require("../models/Book"); // Perbaikan: 'B' besar

const getReturn = async (req, res) => {
    try {
        const returnBook = await BookReturn.findById(req.params.id).populate('memberId').populate('bookId');
        if (!returnBook) return res.status(404).json({ success: false, message: "Return record not found" });
        return res.status(200).json({ success: true, returnBook });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const getAllReturns = async (req, res) => {
    try {
        const returns = await BookReturn.find({}).populate('memberId').populate('bookId');
        return res.status(200).json({ success: true, returnsList: returns });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const addReturn = async (req, res) => {
    try {
        const newReturn = new BookReturn(req.body);
        const savedReturn = await newReturn.save();
        // Setelah buku dikembalikan, status buku jadi 'tersedia'
        await Book.findByIdAndUpdate(req.body.bookId, { isAvailable: true });
        return res.status(201).json({ success: true, newReturn: savedReturn });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const updateReturn = async (req, res) => {
    try {
        const updatedReturn = await BookReturn.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReturn) return res.status(404).json({ success: false, message: "Return record not found" });
        return res.status(200).json({ success: true, updatedReturn });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const deleteReturn = async (req, res) => {
    try {
        const deletedReturn = await BookReturn.findByIdAndDelete(req.params.id);
        if (!deletedReturn) return res.status(404).json({ success: false, message: "Return record not found" });
        return res.status(200).json({ success: true, deletedReturn });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

module.exports = {
    getReturn,
    getAllReturns,
    addReturn,
    updateReturn,
    deleteReturn
};