import { Router } from "express";
import { customer } from "../controllers/customers.controllers.js"
import { customerV } from "../middlewares/customers.middlewares.js"
import { customerUp } from "../controllers/customersUp.controllers.js";
import { customersGet } from "../controllers/customersGet.controllers.js";
import { customerGet2 } from "../controllers/customersGet2.controllers.js";

const router = Router();

router.get("/customers", customersGet)
router.get("/customers/:id", customerGet2)
router.post("/customers", customerV, customer)
router.put("customers/:id", customerV, customerUp)

export default router