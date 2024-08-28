import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// Configure env
dotenv.config();

// DB config
connectDB();

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../client/build")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve React App
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port
const PORT = process.env.PORT || 8080;

// Run server
app.listen(PORT, () => {
  console.log(
    `Server Running ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
