// const Review = require('../models/review')

// const getReview = async (req, res) => {
//     const reviewId = req.params.id;

//     Review.findById(reviewId, (err, review) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             review
//         });
//     });
// }

// const getAllReviews = async (req, res) => {
//     Review.find({}, (err, reviews)=>{
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             reviewsList: reviews
//         });
//     })
// }

// const addReview = async (req, res) => {
//     const newReview = req.body

//     Review.create(newReview, (err, review) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             newReview: review
//         });
//     })
// }

// const updateReview = async (req, res) => {
//     const reviewId = req.params.id
//     const updatedReview = req.body

//     Review.findByIdAndUpdate(reviewId,updatedReview, (err, review) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             updatedReview: review
//         });
//     })
// }

// const deleteReview = async (req, res) => {
//     const reviewId = req.params.id

//     Review.findByIdAndDelete(reviewId, (err, review) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             deletedReview: review
//         });
//     })
// }

// module.exports = {
//     getReview,
//     getAllReviews,
//     addReview,
//     updateReview,
//     deleteReview
// }


const Review = require('../models/Review'); // Perbaikan: 'R' besar

const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ success: false, message: "Review not found" });
        return res.status(200).json({ success: true, review });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        return res.status(200).json({ success: true, reviewsList: reviews });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const addReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        return res.status(201).json({ success: true, newReview: savedReview });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) return res.status(404).json({ success: false, message: "Review not found" });
        return res.status(200).json({ success: true, updatedReview });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ success: false, message: "Review not found" });
        return res.status(200).json({ success: true, deletedReview });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

module.exports = {
    getReview,
    getAllReviews,
    addReview,
    updateReview,
    deleteReview
};