import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Product from "../models/Product.model.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
