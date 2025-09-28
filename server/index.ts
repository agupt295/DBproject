// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line import/first
import express from 'express';
// eslint-disable-next-line import/first
import cors from 'cors';
// eslint-disable-next-line import/first
import authRoutes from './routes/auth';
// eslint-disable-next-line import/first
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Test database connection
  try {
    await connectDB();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});