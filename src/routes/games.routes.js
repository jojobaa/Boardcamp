import { Router } from "express";
import { categoriesV } from "../middlewares/categories.middlewares.js";
import { categories } from "../controllers/categories.controllers.js";
import { categoriesGet } from "../controllers/categoriesGet.controllers.js";
import { Games } from "../controllers/games.controllers.js";
import { games } from "../middlewares/games.middlewares.js";
import { gamesInsert } from "../controllers/gamesInsert.controllers.js";

const router = Router();

router.get("/categories", categoriesGet)
router.post("/categories", categoriesV, categories)
router.get("/games", Games)
router.post("/games", games, gamesInsert)

export default router