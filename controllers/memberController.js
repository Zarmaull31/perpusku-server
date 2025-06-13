// const Member = require('../models/member')

// const getMember = async (req, res) => {
//     const memberId = req.params.id;

//     Member.findById(memberId, (err, member) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             member
//         });
//     });
// }

// const getAllMembers = async (req, res) => {
//     Member.find({}, (err, members)=>{
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             membersList: members
//         });
//     })
// }

// const addMember = async (req, res) => {
//     const newMember = req.body

//     Member.create(newMember, (err, member) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             newMember: member
//         });
//     })
// }

// const updateMember = async (req, res) => {
//     const memberId = req.params.id
//     const updatedMember = req.body

//     Member.findByIdAndUpdate(memberId,updatedMember, (err, member) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             updatedMember: member
//         });
//     })
// }

// const deleteMember = async (req, res) => {
//     const memberId = req.params.id

//     Member.findByIdAndDelete(memberId, (err, member) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             deletedMember: member
//         });
//     })
// }

// module.exports = {
//     getMember,
//     getAllMembers,
//     addMember,
//     updateMember,
//     deleteMember
// }


const Member = require('../models/Member'); // Perbaikan: 'M' besar

const getMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ success: false, message: "Member not found" });
        return res.status(200).json({ success: true, member });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find({});
        return res.status(200).json({ success: true, membersList: members });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const addMember = async (req, res) => {
    try {
        const newMember = new Member(req.body);
        const savedMember = await newMember.save();
        return res.status(201).json({ success: true, newMember: savedMember });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const updateMember = async (req, res) => {
    try {
        const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMember) return res.status(404).json({ success: false, message: "Member not found" });
        return res.status(200).json({ success: true, updatedMember });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        const deletedMember = await Member.findByIdAndDelete(req.params.id);
        if (!deletedMember) return res.status(404).json({ success: false, message: "Member not found" });
        return res.status(200).json({ success: true, deletedMember });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

module.exports = {
    getMember,
    getAllMembers,
    addMember,
    updateMember,
    deleteMember
};