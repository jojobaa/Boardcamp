import { categoriesSchema } from "../models/categories.models.js";
import { connection } from "../database-/database.js";

export async function categoriesV(req, res, next) {
    const name = req.body;
    const { error } = categoriesSchema.validate(name, { abortEarly: false });

    try {
        const categories = await connection.query(
            "SELECT * FROM categories WHERE name= $1",
            [name]
        );

        if (categories) {
            for (let i = 0; i < categories.rows.length; i++) {
                if (categories.rows[i].name === categoryName) {
                    res.sendStatus(409);
                    return;
                }
            }
        }

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).send(errors);
        }

    } catch (err) {
        res.sendStatus(500);
    }

    res.locals.category = name;
    next();
}

