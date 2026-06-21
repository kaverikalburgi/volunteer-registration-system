const {
    createVolunteer
} = require("../models/volunteerModel");

exports.addVolunteer = async (req, res) => {

    try {

        const {
            phone,
            address,
            skills,
            availability,
            motivation
        } = req.body;

        await createVolunteer(
            req.user.id,
            phone,
            address,
            skills,
            availability,
            motivation
        );

        res.status(201).json({
            success: true,
            message: "Volunteer Profile Created"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};