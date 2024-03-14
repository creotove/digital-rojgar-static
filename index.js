import dotenv from "dotenv";
dotenv.config();
import express from "express";
import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";
import userRoutes from "./routes/user.js";
import publisherRoutes from "./routes/publisher.js";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
connectDB();
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/user", userRoutes);
app.use("/publisher", publisherRoutes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
