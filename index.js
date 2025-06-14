// // Import required modules
// const express = require("express");
// const cors = require("cors");
// const logger = require("morgan");
// const passport = require("passport");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const bodyparser = require("body-parser");
// // const createadmin = require("./createAdmin");

// // Import routers
// const authRouter = require("./routes/authRouter");
// const bookRouter = require("./routes/bookRouter");
// const authorRouter = require("./routes/authorRouter");
// // const borrowalRouter = require("./routes/borrowalRouter");
// const borrowalRouter = require("./routes/BorrowalRouter.js");
// const bookReturnRouter = require("./routes/bookReturnRouter");

// const genreRouter = require("./routes/genreRouter");
// const userRouter = require("./routes/userRouter");
// const reviewRouter = require("./routes/reviewRouter");
// //baru gw tambahkan!!
// // const borrowalRoutes = require("./routes/borrowals"); // ini baru ditambahkan oleh saya
// // nama file routes

// // Configure dotenv for environment variables in production
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// // Setup express
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Use morgan for logging
// app.use(logger("dev"));

// // Set middleware to process form data
// app.use(express.urlencoded({ extended: false }));

// // Connect to DB
// const mongoose = require("mongoose");
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to DB on MongoDB Atlas");
//   })
//   .catch((err) => console.log("DB connection error", err));

// // Use CORS for Cross Origin Resource Sharing
// // app.use(cors({
// //   origin: ['http://localhost:3000', 'http://192.168.1.16:3000'],
// //   methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
// //   credentials: true,
// //   allowedHeaders: ['Content-Type', 'Authorization']

// // }))

// // KODE BARU YANG DIANJURKAN
// app.use(
//   cors({
//     // Izinkan URL frontend dari environment variable, dan localhost untuk development
//     origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
//     methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT", "PATCH"], // Tambahkan metode lain jika perlu
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Set middleware to manage sessions
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// // INI BARU GW TAMBAHKAN

// app.use(bodyparser.urlencoded({ extended: false }));
// // app.use(bodyparser.json());
// // Parse JSON objects in request bodies
// app.use(express.json());

// // Parse cookies used for session management
// app.use(cookieParser(process.env.SESSION_SECRET));

// app.use("/api/genre", genreRouter);

// // Use passport authentication middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Initialise passport as authentication middleware
// const initializePassport = require("./passport-config");
// initializePassport(passport);

// // Implement routes for REST API
// app.use("/api/auth", authRouter);
// app.use("/api/book", bookRouter);
// app.use("/api/author", authorRouter);
// app.use("/api/borrowal", borrowalRouter);
// // app.use("/api/bookReturn", bookReturnRouter)
// app.use("/api/bookReturn", bookReturnRouter);

// app.use("/api/genre", genreRouter);
// app.use("/api/user", userRouter);
// app.use("/api/review", reviewRouter);

// //baru gw tambahkan!!
// // import route borrowalRoutes
// // app.use("/api/borrowals", borrowalRoutes); // ini baru ditambahkan oleh saya
// // app.use('/api/bookreturns', bookReturnRoutes);

// app.get("/", (req, res) => res.send("Selamat datang di API Web Perpusku"));

// app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

// // createadmin();

// // route untk mengambil data pinjaman buku
// const statistikRoutes = require("./routes/statistik");
// app.use("/api/statistik", statistikRoutes);

// // const genreRoutes = require("./routes/genreRouter");
// // app.use("/api/genre", genreRoutes);

// // createadmin();


// File: index.js (Versi Bersih & Efisien)

// Import modul inti
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
// const createadmin = require("./createAdmin");

// Konfigurasi environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import semua router yang dipakai
const authRouter = require("./routes/authRouter");
const bookRouter = require("./routes/bookRouter");
const authorRouter = require("./routes/authorRouter");
const borrowalRouter = require("./routes/BorrowalRouter"); // Kita hanya pakai satu router ini
const bookReturnRouter = require("./routes/bookReturnRouter");
const genreRouter = require("./routes/genreRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const statistikRoutes = require("./routes/statistik");

// Setup express app
const app = express();
const PORT = process.env.PORT || 5000;

// Koneksi ke Database
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB on MongoDB Atlas"))
  .catch((err) => console.log("DB connection error", err));

// Middleware
app.use(logger("dev"));
app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"], // Tambahkan port lokal baru
  methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); // Pengganti bodyparser.json()
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));

// Middleware Passport.js
app.use(passport.initialize());
app.use(passport.session());
const initializePassport = require("./passport-config");
initializePassport(passport);

// Implementasi Routes API
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);
app.use("/api/author", authorRouter);
app.use("/api/borrowal", borrowalRouter); // Hanya ini yang digunakan untuk borrowal
app.use("/api/bookReturn", bookReturnRouter);
app.use("/api/genre", genreRouter);
app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/statistik", statistikRoutes);

// createadmin(); // Panggil fungsi untuk membuat admin jika belum ada
// Root route untuk testing
app.get("/", (req, res) => res.send("Selamat datang di API Web Perpusku"));


// Jalankan Server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));