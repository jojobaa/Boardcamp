import { connection } from "../database-/database.js";

export async function customer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  console.log(req.body)
  
  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
      VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );
    return res.sendStatus(201);
   
  } catch (err) {
    return res.status(500).send(err.message);
  }
}