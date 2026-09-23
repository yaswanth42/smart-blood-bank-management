import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import { swaggerUi, swaggerDocs } from "./openapi/index.js"

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
}));

// 🗄️ Database Connection Middleware for Serverless Execution
let isConnected = false;
const connectDB = async (req, res, next) => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return next();
  }
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://admin:admin123@login.r8hpvmw.mongodb.net/bbms?appName=login";
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("MongoDB Connected ✅");
    next();
  } catch (error) {
    console.error("MongoDB Connection Error ❌:", error);
    res.status(500).json({ message: "Database connection error", error: error.message });
  }
};

app.use(connectDB);

app.get(["/", "/api"], (req, res) => {
  res.json({ status: "success", message: "Blood Bank Management System Backend API is running 🚀" });
});

// 🧩 Routes (support both /api/path and /path in Vercel serverless routing)
app.use(["/api/auth", "/auth"], authRoutes);
app.use(["/api/donor", "/donor"], donorRoutes);
app.use(["/api/facility", "/facility"], facilityRoutes);
app.use(["/api/admin", "/admin"], adminRoutes);

import bloodLabRoutes from "./routes/bloodLabRoutes.js";
app.use(["/api/blood-lab", "/blood-lab"], bloodLabRoutes);

import hospitalRoutes from "./routes/hospitalRoutes.js";
app.use(["/api/hospital", "/hospital"], hospitalRoutes);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
}

export default app;
