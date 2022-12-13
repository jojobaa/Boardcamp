import express from "express";
import cors from "cors";
import games from "./routes/games.routes.js"
import customer from "./routes/customers.routes.js"
import rental from "./routes/rentals.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(games);
app.use(customer);
app.use(rental);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));