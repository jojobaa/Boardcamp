import { connection } from "../database-/database.js";
import { customersSchema } from "../models/customers.models.js";

export async function customerV(req, res, next) {
  const { name, phone, cpf, birthday } = req.body;
  const { error } = customersSchema.validate(req.body, { abortEarly: false });

  const customer = {
    name: name,
    phone: phone,
    cpf: cpf,
    birthday: birthday
  }

  try {
    const cpfcustomer = await connection.query(
      'SELECT * FROM customers WHERE cpf= $1::varchar(11)',
      [cpf]
    );

    if (cpfcustomer.rowCount > 0) {
      return res.sendStatus(409);
    }

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    
  } catch (err) {
    return res.status(500).send(`erro: ${err.message}`);
  }

  res.locals = customer;
  next();
}