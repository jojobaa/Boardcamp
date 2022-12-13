import { connection } from "../database-/database.js";
import { gamesSchema } from "../models/games.models.js";
//
export async function games(req, res, next) {
    const { name, image, stockTotal, pricePerDay, categoryId } = req.body;
    const { error } = gamesSchema.validate(req.body, { abortEarly: false });

    const game = {
        name: name,
        image: image,
        stockTotal: stockTotal,
        pricePerDay: pricePerDay,
        categoryId: categoryId
    }

    try {
        const categories = await connection.query(
            "SELECT * FROM categories WHERE id = $1::numeric",
            [categoryId]
        );

        if (categories.rowCount === 0) {
            return res.sendStatus(400);
        }

        const gamesName = await connection.query(
            "SELECT * FROM games WHERE name = $1::text",
            [name]
        );

        if (gamesName.rowCount > 0) {
            return res.sendStatus(409);
        }

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).send(errors);

        }
    } catch (err) {
        return res.status(500).send(`erro: ${err.message}`);
    }

    res.locals = game;
    next();
}