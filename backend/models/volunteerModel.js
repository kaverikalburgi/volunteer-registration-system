const db = require("../config/db");

const createVolunteer = async (
    user_id,
    phone,
    address,
    skills,
    availability,
    motivation
) => {

    const [result] = await db.query(
        `INSERT INTO volunteers
        (
            user_id,
            phone,
            address,
            skills,
            availability,
            motivation
        )
        VALUES(?,?,?,?,?,?)`,
        [
            user_id,
            phone,
            address,
            skills,
            availability,
            motivation
        ]
    );

    return result;
};

module.exports = {
    createVolunteer
};