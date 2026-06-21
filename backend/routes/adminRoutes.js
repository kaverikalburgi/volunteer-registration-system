const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const {
    getDashboardStats,
    getAllVolunteers,
    approveVolunteer,
    rejectVolunteer,
    deleteVolunteer,
    exportCSV 
} = require("../controllers/adminController");

router.get(
    "/stats",
    verifyToken,
    getDashboardStats
);

router.get(
    "/volunteers",
    verifyToken,
    getAllVolunteers
);

router.put(
    "/approve/:id",
    verifyToken,
    approveVolunteer
);

router.put(
    "/reject/:id",
    verifyToken,
    rejectVolunteer
);

router.delete(
    "/delete/:id",
    verifyToken,
    deleteVolunteer
);

router.get(
    "/export",
    verifyToken,
    exportCSV
);

module.exports = router;