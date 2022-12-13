import { connection } from "../database-/database.js";

export async function customerGet2(req, res) {
    const { id } = req.params

    try {
        const customer = await connection.query("SELECT * FROM customers WHERE id=$1", [id])

        if (customer.rowCount > 0) {
            return res.send(customer.rows)
        } else {
            return res.status(404);
        }

    } catch (err) {
        return res.status(500).send(err.message);
    }
}