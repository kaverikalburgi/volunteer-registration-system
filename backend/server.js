const dotenv = require("dotenv");

const result = dotenv.config();

console.log(result);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ⭐ FRONTEND (FULL FOLDER SERVE) */
app.use(express.static(path.join(__dirname, "../frontend")));

/* HOME PAGE */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/index.html"));
});

/* ROUTES */
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/register.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/login.html"));
});

app.get("/volunteer-dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/volunteer-dashboard.html"));
});

app.get("/admin-dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/admin-dashboard.html"));
});

/* API ROUTES */
const authRoutes = require("./routes/authRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/admin", adminRoutes);

/* START SERVER */
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});