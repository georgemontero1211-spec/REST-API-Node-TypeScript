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

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: Monitor curvo de 49 pulgadas
 *        price:
 *          type: number
 *          description: The product price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: The product availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: GET a list of products
 *     tags: [Products]
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: GET a product by ID
 *     tags: [Products]
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *          description: invalid ID
 */
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
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Creates and returns a new product record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor de 49 pulgadas"
 *               price:
 *                 type: number
 *                 example: 399
 *     responses:
 *       201:
 *         description: Product successfully created
 *       400:
 *         description: Validation error
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     description: Updates an existing product with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - availability
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated product name
 *                 example: "Monitor UltraWide 49 pulgadas"
 *               price:
 *                 type: number
 *                 description: The updated price (must be greater than 0)
 *                 example: 499
 *               availability:
 *                 type: boolean
 *                 description: Whether the product is available or not
 *                 example: true
 *     responses:
 *       200:
 *         description: Product successfully updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 */

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
/**
 * @swagger
 * /api/products/{id}/availability:
 *   patch:
 *     summary: Update product availability by ID
 *     tags:
 *       - Products
 *     description: Updates the availability status of a product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - availability
 *             properties:
 *               availability:
 *                 type: boolean
 *                 description: New availability status of the product
 *                 example: true
 *     responses:
 *       200:
 *         description: Product availability successfully updated
 *       400:
 *         description: Invalid input for availability
 *       404:
 *         description: Product not found
 */

router.patch(
  "/:id",
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  handleInputErrors,
  updateAvailabilityProduct
);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     description: Deletes a product from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Product deleted successfully"
 *       400:
 *         description: Validation error for the ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             example:
 *               errors:
 *                 - "Tienes que poner un id para poder buscarlo"
 *                 - "El valor tiene que ser numerico"
 *                 - "ID no valido"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Product not found"
 */

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
