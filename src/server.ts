import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import router from "./router.ts";
import db from "./config/db.ts";
import swaggerUi, { serve } from "swagger-ui-express";
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
//Instancia de express
const server = express();
//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      console.log(origin);

      callback(new Error("Error de cors "));
    }
  },
};
server.use(cors(corsOptions));

//Leer datos de formularios
server.use(express.json());

server.use(morgan("dev"));
//Routing
server.use("/api/products", router);
server.get("/api", (req, res) => {
  res.json({ msg: "Desde la API" });
});

// Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
