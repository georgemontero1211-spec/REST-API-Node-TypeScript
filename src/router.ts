import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product.js";

const router = Router();

router.post(
  "/",
  await body("name")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio"),

  await body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),

  createProduct
);

export default router;
