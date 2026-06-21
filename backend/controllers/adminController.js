const db = require("../config/db");

const sendEmail = require("../utils/email");  // 👈 ADD HERE

exports.getDashboardStats = async (req, res) => {
    try {
        const [total] = await db.query(
            "SELECT COUNT(*) as total FROM volunteers"
        );

        const [pending] = await db.query(
            "SELECT COUNT(*) as pending FROM volunteers WHERE status='Pending'"
        );

        const [approved] = await db.query(
            "SELECT COUNT(*) as approved FROM volunteers WHERE status='Approved'"
        );

        const [rejected] = await db.query(
            "SELECT COUNT(*) as rejected FROM volunteers WHERE status='Rejected'"
        );

        res.json({
            success: true,
            stats: {
                total: total[0].total,
                pending: pending[0].pending,
                approved: approved[0].approved,
                rejected: rejected[0].rejected
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.getAllVolunteers = async (req, res) => {
    try {

        const [volunteers] = await db.query(`
            SELECT
            volunteers.*,
            users.full_name,
            users.email
            FROM volunteers
            JOIN users
            ON volunteers.user_id = users.id
            ORDER BY volunteers.created_at DESC
        `);

        res.json({
            success: true,
            volunteers
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.approveVolunteer = async (req, res) => {
    try {

        const { id } = req.params;

        await db.query(
            `SELECT u.email FROM users u
            JOIN volunteers v
            ON u.id = v.user_id
            WHERE v.id=?`,
            [id]
        );

        await sendEmail(
            user.email,
            "Volunteer Approved 🎉",
            "Congratulations! You are approved as a volunteer."
        );

        res.json({
            success: true,
            message: "Volunteer Approved"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.rejectVolunteer = async (req, res) => {
    try {

        const { id } = req.params;

        await db.query(
            "UPDATE volunteers SET status='Rejected' WHERE id=?",
            [id]
        );

        res.json({
            success: true,
            message: "Volunteer Rejected"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.deleteVolunteer = async (req, res) => {
    try {

        const { id } = req.params;

        await db.query(
            "DELETE FROM volunteers WHERE id=?",
            [id]
        );

        res.json({
            success: true,
            message: "Volunteer Deleted"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.exportCSV = async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
            u.full_name,
            u.email,
            v.phone,
            v.skills,
            v.status
            FROM volunteers v
            JOIN users u
            ON v.user_id = u.id
        `);

        let csv =
        "Name,Email,Phone,Skills,Status\n";

        rows.forEach(row => {

            csv +=
            `${row.full_name},${row.email},${row.phone},${row.skills},${row.status}\n`;
        });

        res.header(
            "Content-Type",
            "text/csv"
        );

        res.attachment(
            "volunteers_report.csv"
        );

        res.send(csv);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};