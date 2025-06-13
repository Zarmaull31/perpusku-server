

const User = require("./models/User");

var createadmin = async () => {
  try {
    // Cek apakah admin dengan email tertentu sudah ada
    const existing = await User.findOne({ email: "perpuskuapp@gmail.com" });

    if (existing) {
      console.log("Admin sudah ada, tidak dibuat ulang.");
      return;
    }

    const user = new User({
      name: "AdminPerpus",
      email: "perpuskuapp@gmail.com",
      dob: new Date(),
      phone: "083871689461",
      isAdmin: true,
      photoUrl: `https://avatars.dicebear.com/api/initials/${"Admin Sekolah".replace(" ", "+")}.svg`,
    });

    await user.setPassword("Perpusku");
    await user.save();

    console.log("Admin berhasil dibuat.");
  } catch (error) {
    console.error("Gagal membuat admin:", error);
  }
};

module.exports = createadmin;
