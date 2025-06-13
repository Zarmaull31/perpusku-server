// const User = require('../models/User')

// const getUser = async (req, res) => {
//     const userId = req.params.id;

//     User.findById(userId, (err, user) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             user
//         });
//     });
// }

// const getAllUsers = async (req, res) => {
//     User.find({}, (err, users)=>{
//         if (err) {
//           return res.status(400).json({success: false, err});
//         }

//       return res.status(200).json({
//         success: true,
//         usersList: users
//       });
//     })
// }

// const getAllMembers = async (req, res) => {
//   User.find({isAdmin: false}, (err, members) => {
//     if (err) {
//       return res.status(400).json({success: false, err});
//     }

//     return res.status(200).json({
//       success: true,
//       membersList: members
//     });
//   })
// }

// const addUser = async (req, res) => {
//   const newUser = req.body
//   console.log(req.body)

//   User.findOne({email: newUser.email}, (err, user) => {
//     if (err) {
//       return res.status(400).json({success: false, err});
//     }
//     if (user) {
//       return res.status(403).json({success: false, message: "Sudah ada user dengan email tersebut"});
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

// const updateUser = async (req, res) => {
//     const userId = req.params.id
//   const updatedUser = new User(req.body)
//     updatedUser.setPassword(req.body.password);

//     User.findByIdAndUpdate(userId,updatedUser, (err, user) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             updatedUser: user
//         });
//     })
// }

// const deleteUser = async (req, res) => {
//     const userId = req.params.id

//     User.findByIdAndDelete(userId, (err, user) => {
//         if (err) {
//             return res.status(400).json({ success: false, err });
//         }

//         return res.status(200).json({
//             success: true,
//             deletedUser: user
//         });
//     })
// }

// module.exports = {
//   getUser,
//   getAllUsers,
//   getAllMembers,
//   addUser,
//   updateUser,
//   deleteUser
// }


const User = require('../models/User'); // Perbaikan: 'U' besar

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        return res.status(200).json({ success: true, user });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ success: true, usersList: users });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const getAllMembers = async (req, res) => {
    try {
        const members = await User.find({ isAdmin: false });
        return res.status(200).json({ success: true, membersList: members });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

// Fungsi addUser dan updateUser memerlukan perhatian khusus karena berhubungan dengan password
const addUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(403).json({ success: false, message: "User with this email already exists" });
        }
        const newUser = new User({ name: req.body.name, email: req.body.email, isAdmin: req.body.isAdmin });
        newUser.setPassword(req.body.password);
        const savedUser = await newUser.save();
        return res.status(201).json({ success: true, user: savedUser });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userToUpdate = await User.findById(req.params.id);
        if (!userToUpdate) return res.status(404).json({ success: false, message: "User not found" });
        
        // Update fields
        userToUpdate.name = req.body.name;
        userToUpdate.email = req.body.email;
        userToUpdate.isAdmin = req.body.isAdmin;
        
        // Jika ada password baru, set password baru. Jika tidak, hash & salt lama tetap dipakai.
        if (req.body.password) {
            userToUpdate.setPassword(req.body.password);
        }
        
        const updatedUser = await userToUpdate.save();
        return res.status(200).json({ success: true, updatedUser });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ success: false, message: "User not found" });
        return res.status(200).json({ success: true, deletedUser });
    } catch (err) {
        return res.status(400).json({ success: false, err: err.message });
    }
};

module.exports = {
  getUser,
  getAllUsers,
  getAllMembers,
  addUser,
  updateUser,
  deleteUser
};