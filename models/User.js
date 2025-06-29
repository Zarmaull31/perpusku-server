// // Importing modules
// const mongoose = require("mongoose");
// const crypto = require("crypto");

// // Creating user schema
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   dob: {
//     type: Date,
//     required: false,
//   },
//   phone: {
//     type: String,
//     required: false,
//   },
//   isAdmin: {
//     type: Boolean,
//     required: true,
//   },
//   photoUrl: {
//     type: String,
//     required: true,
//   },
//   hash: String,
//   salt: String,
// },  { timestamps: true });

// // Method to set salt and hash the password for a user
// UserSchema.methods.setPassword = function (password) {
//   // Creating a  unique salt for a particular user
//   this.salt = crypto.randomBytes(16).toString("hex");

//   // Hashing user's salt and password with 1000 iterations
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
//     .toString(`hex`);
// };

// // Method to check whether the entered password is correct or not
// UserSchema.methods.isValidPassword = function (password) {
//   const hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
//     .toString(`hex`);
//   return this.hash === hash;
// };

// // module.exports = mongoose.model("User", UserSchema);
// module.exports = mongoose.models.User || mongoose.model("User", UserSchema);


const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: String,
  salt: String,
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  photoUrl: {
    type: String,
    required: false // Dibuat opsional
  },
}, { timestamps: true });

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

UserSchema.methods.isValidPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);