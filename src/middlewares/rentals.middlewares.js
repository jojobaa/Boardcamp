import { connection } from "../database-/database.js";
import { rentalsSchema } from "../models/rentals.models.js";
import dayjs from "dayjs";

export async function rentalV(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;
    const { error } = rentalsSchema.validate(req.body, { abortEarly: false });
    let rental;

    try {
        const games = await connection.query("SELECT * FROM games WHERE id=$1", [gameId])
        const rent = daysRented * games.rows[0].pricePerDay;

        const customer = await connection.query(
            "SELECT * FROM customers WHERE id = $1::numeric",
            [customerId]
        );

        if (customer.rowCount === 0) {
            return res.sendStatus(400);
        }

        const game = await connection.query(
            "SELECT * FROM games WHERE id= $1::numeric",
            [gameId]
        );

        if (game.rowCount === 0) {
            return res.sendStatus(400);
        }

        const rentals = await connection.query(`SELECT * FROM rentals 
          WHERE "gameId" = $1 AND "returnDate" IS NULL;`, [gameId])

        const stockGames = await connection.query(`SELECT "stockTotal" FROM games WHERE id=$1;`, [gameId])
        if (rentals.rowCount > (stockGames.rows[0].stockTotal - 1)) {
            return res.status(400).send("");
        }
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).send(errors);
        }
        rental = {
            customerId: customerId,
            gameId: gameId,
            rentDate: dayjs().format("YYYY-MM-DD"),
            daysRented: daysRented,
            returnDate: null,
            originalPrice: rent,
            delayFee: null
        }

    } catch (err) {
        return res.status(500).send(`erro: ${err.message}`);
    }

    res.locals = rental;
    next();
}