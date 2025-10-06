import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailabilityProduct,
  updateProduct,
} from "./handlers/product.ts";
import { handleInputErrors } from "./middleware/index.ts";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Tienes que poner un id para poder buscarlo")
    .isInt()
    .withMessage("El valor tiene que ser numerico")
    .custom((value) => value > 0)
    .withMessage("ID no valido"),
  handleInputErrors,
  getProductById
);
router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
);
router.put(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Tienes que poner un id para poder buscarlo")
    .isInt()
    .withMessage("El valor tiene que ser numerico")
    .custom((value) => value > 0)
    .withMessage("ID no valido"),
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),

  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  handleInputErrors,
  updateAvailabilityProduct
);

router.delete(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("Tienes que poner un id para poder buscarlo")
    .isInt()
    .withMessage("El valor tiene que ser numerico")
    .custom((value) => value > 0)
    .withMessage("ID no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
