import { Router } from "express";
import { categories } from "../controllers/categories.controllers";
import { categoriesGet } from "../controllers/categoriesGet.controllers";

const routes = Router();

routes.get("/categories", categoriesGet)
routes.post("/categories", categories, categoriesGet)

export default routes