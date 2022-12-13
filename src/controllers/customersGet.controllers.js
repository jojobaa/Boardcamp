import { connection } from "../database-/database.js";

export async function customersGet(req, res) {
    const cpf = req.query.cpf

    try {
        if (cpf) {
            const customersCpf = await connection.query(
                `SELECT * FROM customers WHERE cpf LIKE $1`, [cpf + "%"]
            );

            return res.send(customersCpf.rows)
        }
        const customers = await connection.query("SELECT * FROM customers;")
        return res.send(customers.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}