const db = require("../config/db");

const createUser = async (full_name, email, password) => {
    const [result] = await db.query(
        `INSERT INTO users(full_name,email,password)
         VALUES(?,?,?)`,
        [full_name, email, password]
    );

    return result;
};

const findUserByEmail = async (email) => {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    );

    return rows[0];
};

module.exports = {
    createUser,
    findUserByEmail
};