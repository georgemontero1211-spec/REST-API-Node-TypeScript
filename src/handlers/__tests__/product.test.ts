import request from "supertest";
import server from "../../server.ts";

describe("POST /api/products", () => {
  test("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  test("should validate that the price is greater than 0", async () => {
    const response = await request(server)
      .post("/api/products")
      .send({ name: "Monitor Curvo - Test", price: 0 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  test("should validate that the price a number and greater than 0", async () => {
    const response = await request(server)
      .post("/api/products")
      .send({ name: "Monitor Curvo - Test", price: "hola" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });

  test("should create a new product", async () => {
    const response = await request(server)
      .post("/api/products")
      .send({ name: "Mouse - Testing", price: 50 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).not.toHaveProperty("errors");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
  });
});

describe("GET /api/products", () => {
  test("should check if api/products url exists", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });

  test("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  test("should return a 404 response for a non-existent product", async () => {
    const productID = 2000;
    const response = await request(server).get(`/api/products/${productID}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
  });

  test("should check a valid ID in the URL", async () => {
    const response = await request(server).get(`/api/products/not-valid-url`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toBe("El valor tiene que ser numerico");
  });

  test("Get a JSON response for a single product", async () => {
    const response = await request(server).get(`/api/products/1`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/product/:id", () => {
  test("should check a valid ID in the URL", async () => {
    const response = await request(server)
      .put(`/api/products/not-valid-url`)
      .send({
        name: "Monitor curvo -test",
        price: 100,
        availability: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toBe("El valor tiene que ser numerico");
  });

  test("should display validation error messages when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("should validate that the price is greater than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor curvo -test",
      price: -100,
      availability: true,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors[0].msg).toBe("Precio no valido");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("should return a 404 response for a non-existent product", async () => {
    const productID = 2000;
    const response = await request(server)
      .put(`/api/products/${productID}`)
      .send({
        name: "Monitor curvo -test",
        price: 100,
        availability: true,
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("should update an existing product with valid data", async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: "Monitor curvo -test",
      price: 100,
      availability: true,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors  ");
  });
});

describe("PATCH /api/product/:id", () => {
  test("should return a 404 response for a non-existing product", async () => {
    const productID = 2000;
    const response = await request(server)
      .patch(`/api/products/${productID}`)
      .send({
        name: "Monitor curvo -test",
        price: 100,
        availability: true,
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("should update the product availability", async () => {
    const response = await request(server).patch("/api/products/1");
  });
});

describe("DELETE /api/products/:id", () => {
  test("should check a valid ID", async () => {
    const response = await request(server).delete(
      `/api/products/not-valid-url`
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toBe("El valor tiene que ser numerico");
  });

  test("should validate if a product exist", async () => {
    const productID = 3000;
    const response = await request(server).delete(`/api/products/${productID}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
  });

  test("should delete a product", async () => {
    const response = await request(server).delete("/api/products/1");

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("Producto eliminado");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});
