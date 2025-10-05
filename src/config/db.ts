import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import Product from "../models/Product.model.ts";
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
  models: [Product],
  logging: false,
});

export default db;
