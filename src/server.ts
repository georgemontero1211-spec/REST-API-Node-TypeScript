import express from "express";
import colors from "colors";
import router from "./router.ts";
import db from "./config/db.ts";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.ts";
//Conectar a base da datos
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    // console.log(colors.magenta("Connection successful to database "));
  } catch (error) {
    console.log(error);
    console.log(
      colors.bgRed.white.bold("Hubo un error al conectar con la base de datos")
    );
  }
}
connectDB();
const server = express();

server.use(express.json());

//Routing
server.use("/api/products", router);
server.get("/api", (req, res) => {
  res.json({ msg: "Desde la API" });
});

// Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
