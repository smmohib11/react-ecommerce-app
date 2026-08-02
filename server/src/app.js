import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import pool from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import orderRoutes from "./routes/order.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import attributeRoutes from "./routes/attribute.routes.js";
import attributeValueRoutes from "./routes/attributeValue.routes.js";
import variationRoutes from "./routes/variation.routes.js";
import specificationRoutes from "./routes/specification.routes.js";
import userRoutes from "./routes/user.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import shippingRoutes from "./routes/shipping.routes.js";

const app = express();



// ==========================
// Middlewares
// ==========================
app.use(cors());
app.use(
  express.json({
    verify: (req, res, buf) => {
      console.log("Raw Body:");
      console.log(buf.toString());
    },
  })
);
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log("==============");
  console.log(req.method);
  console.log(req.originalUrl);
  console.log(req.headers["content-type"]);
  next();
});


// ==========================
// Static Upload Folder
// ==========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/attributes", attributeRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/attribute-values", attributeValueRoutes);
app.use("/api/variations", variationRoutes);
app.use("/api/specifications",specificationRoutes);


app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

app.use("/api/settings", settingsRoutes);

// ==========================
// SHIPPING ROUTES
// ==========================


app.use("/api/shipping",shippingRoutes);

// ======================s====
// Home Route
// ==========================
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS time");

    res.json({
      success: true,
      database: rows[0].time,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default app;