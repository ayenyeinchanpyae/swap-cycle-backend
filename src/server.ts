import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import { notFound, errorHandler } from './middlewares/ErrorMiddleware';
import userRoutes from './modules/user/userRoutes';
import productRoutes from './modules/product/productRoutes';
import orderRoutes from './modules/order/orderRoutes';

const app: Application = express();

dotenv.config();

connectDB();

app.use(express.json());
// Use CORS middleware
app.use(cors());

console.log('server.ts')

// Default
app.get('/api', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Welcome to Auth ts' });
});

// User Route
app.use('/api/auth', userRoutes);
// Product Routes
app.use('/api/product', productRoutes);
// Order Routes
app.use('/api/order', orderRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));
