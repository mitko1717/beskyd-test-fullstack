import express, { Express, Request, Response, NextFunction } from 'express';
import recordRoutes from './routes/recordRoutes';
import connectDB from './database';

const app: Express = express();

app.use(express.json());

// connect to db
connectDB()
  .then(() => {
    // routes
    app.use('/api/records', recordRoutes);

    // error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });

    // Start the server
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

export default app;
