import { connection } from "../database-/database.js";

export async function Games(req, res) {
    const name = req.query.name

    try {
        if (name) {
            const gamesName = await connection.query(
                `'SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;' WHERE name ILIKE $1`, [name + "%"]
            );
            return res.send(gamesName.rows)
        }
        const games = await connection.query('SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;')
        return res.send(games.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}