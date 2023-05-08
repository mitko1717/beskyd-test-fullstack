import express, { Express, Request, Response, NextFunction } from 'express';
import recordRoutes from './routes/recordRoutes';
import { createConnection } from 'typeorm';

const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/records', recordRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
