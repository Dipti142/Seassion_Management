import "dotenv/config";

import http from "http";
import path from "path";
import express from "express";
import cors from "cors";

import sequelize from "./config/db";
import "./models/user";
import authRoutes from "./routes/auth";
import { initSocket } from "./socket";
import { errorHandler } from "./utils/error.util";

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use(express.static(path.join(__dirname, "../public")));
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

async function start() {
  await sequelize.authenticate();
  console.log("Database connected");
  await sequelize.sync();
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err: Error) => {
  console.error("Failed to start:", err.message);
  process.exit(1);
});
