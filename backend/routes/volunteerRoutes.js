const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const {
    addVolunteer
} = require("../controllers/volunteerController");

router.post(
    "/create",
    verifyToken,
    addVolunteer
);

module.exports = router;
