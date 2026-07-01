import express, { Request, Response, NextFunction } from "express";
import corsMiddleware from "./middlewares/cors";
import { connectDB } from "./config/Db";
import designRouter from "./routes/DesignRoute";
import userRouter from "./routes/UserRoute";
import adminRouter from "./routes/AdminRoute";
import limiter from "./middlewares/rateLimiter";
import "dotenv/config";
import cartRouter from "./routes/CartRoute";
import orderRouter from "./routes/OrderRoute";
import authMiddleware from "./middlewares/auth";
import securityMiddleware from "./middlewares/security";
import logger from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";
import permissionRouter from "./routes/PermissionRoute";
import session from "express-session";
import cookieParser from "cookie-parser";
import "./config/passport";
import passport from "passport";
import BotRouter from "./routes/BotRoute";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(corsMiddleware);
app.options("*", corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.use(securityMiddleware);

// Rate Limiter
app.use(limiter);

app.use("/images", express.static(path.join(__dirname, "../uploads")));

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use("/api/design", designRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/permission", permissionRouter);

app.use("/api/chat", BotRouter);

app.use("/api/protected", authMiddleware, (req, res) => {
  res.send("Hello, authenticated user!");
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// GLOBAL ERROR HANDLER 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});