import { Router } from "express";
import { rentals } from "../controllers/rentals.controllers.js";
import { rentalsDelete } from "../controllers/rentalsDelete.controllers.js";
import { rentalsGet } from "../controllers/rentalsGet.controllers.js";
import { rentalUp } from "../controllers/rentalsUp.controllers.js";
import { rentalV } from "../middlewares/rentals.middlewares.js";
import { rentalsDeleteV } from "../middlewares/rentalsDelete.middlewares.js";

const router = Router();

router.get("/rentals", rentalsGet)
router.post("/rentals", rentalV, rentals)
router.post("/rentals/:id/return", rentalV, rentalUp)
router.delete("/rentals/:id", rentalsDelete, rentalsDeleteV)

export default router