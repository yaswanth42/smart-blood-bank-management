import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/adminModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
    // Remove existing admin with same email
    await Admin.deleteMany({ email: "reddy34yash@gmail.com" });

    // Create new admin
    const admin = new Admin({
      name: "yash",
      email: "reddy34yash@gmail.com",
      password: "yash@admin", // will be hashed automatically
      role: "admin",
    });

    await admin.save();
    console.log("Admin seeded successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
