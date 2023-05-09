import express, { Express, Request, Response, NextFunction } from "express";
import recordRoutes from "./routes/recordRoutes";
import connectDB from "./database";
import cors from "cors";

const app: Express = express();

app.use(express.json());

// connect to db
connectDB()
  .then(() => {
    // Enable CORS
    app.use(cors({ origin: "http://localhost:3000" }));

    // routes
    app.use("/api/records", recordRoutes);

    // error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

export default app;
