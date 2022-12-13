import { connection } from "../database-/database.js";
import dayjs from "dayjs";

export async function rentalUpV(req, res, next) {
    const { id } = req.params;
    const dateRental = dayjs().format("YYYY-MM-DD");
    let date;

    try {
        const rental = await connection.query(
            "SELECT * FROM rentals WHERE id = $1::numeric",
            [id]
        );

        if (rental.rowCount === 0) {
            return res.sendStatus(400);
        }

        const rentalFinal = await connection.query(
            `SELECT * FROM rentals WHERE id = $1::numeric AND "returnDate" IS NOT NULL;`,
            [id]
        );

        if (rentalFinal.rowCount !== 0) {
            return res.sendStatus(400);
        }

        const rentalDate = await connection.query(
            `SELECT TO_CHAR("rentDate", 'YYYY-MM-DD') FROM rentals WHERE id = $1::numeric;`,
            [id]
        );

        const rentalsDate = rentalDate.rows[0].to_char;
        const today = dayjs(currentDay);
        const delayfee = today.diff(rentalsDate, "day");
        const gamePrice = rental.rows[0].originalPrice / rental.rows[0].daysRented
        const delayFee = gamePrice * delayfee;
    

        data = {
            id: req.params.id,
            returnDate: currentDay,
            delayFee: delayFee,
        };
    } catch (err) {
        return res.status(500).send(`erro: ${err.message}`);
    }

    res.locals = data;
    next();
}
