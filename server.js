import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import connectDB from './config/db.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authenticate } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable CORS for the frontend origin
// Routes
app.use('/api/vehicles', authenticate, vehicleRoutes);
app.use('/api/auth', authRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
