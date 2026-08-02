import dotenv from "dotenv";
import express from "express";
import app from "./app.js";
import brandRoutes from "./routes/brand.routes.js";

import attributeRoutes from "./routes/attribute.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import profileRoutes from "./routes/profile.routes.js";

app.use("/api/cart", cartRoutes);
app.use("/api/attributes", attributeRoutes);

dotenv.config();

// Routes
app.use("/api/brands", brandRoutes);
app.use("/api/profile", profileRoutes);

// Static Upload Folder
app.use("/uploads", express.static("src/uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});