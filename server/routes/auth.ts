import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { executeQuery } from '../config/database';

// Extend Express Request type to include user property
interface AuthenticatedRequest extends express.Request {
  user?: {
    userId: number;
    email: string;
  };
}

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await executeQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    await executeQuery(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const users = await executeQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0] as any;

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret') as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Delete account route
router.delete('/delete-account', verifyToken, async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    const { userId } = req.body;
    const tokenUserId = req.user?.userId;

    if (!tokenUserId) {
      return res.status(401).json({ message: 'Invalid authentication' });
    }

    // Verify that the user is deleting their own account
    if (parseInt(userId) !== tokenUserId) {
      return res.status(403).json({ message: 'Unauthorized to delete this account' });
    }

    // Check if user exists
    const users = await executeQuery(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await executeQuery(
      'DELETE FROM users WHERE id = ?',
      [userId]
    );

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;