import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import { errorHandle } from "./middlewares/error.middleware.js";

const app = express();

/* ========================
   Sécurité HTTP
======================== */
app.use(
  helmet({
    contentSecurityPolicy: false, // À activer en production avec configuration adaptée
  })
);

/* ========================
   CORS contrôlé
======================== */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

/* ========================
   Parsing JSON
======================== */
app.use(express.json());

/* ========================
   Rate limit global
======================== */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ========================
   Rate limit spécifique auth
======================== */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // plus strict pour login/register
  message: { error: "Trop de tentatives, réessayez plus tard." },
});

app.use("/api/auth", authLimiter, authRoutes);
app.use('/api/users' ,authLimiter,  userRoutes )

/* ========================
   404 handler
======================== */
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

/* ========================
   Error middleware
======================== */
app.use(errorHandle);

export default app;