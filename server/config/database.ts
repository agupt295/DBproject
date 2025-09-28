import mysql from 'mysql2/promise';

// Debug: Log environment variables
console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***hidden***' : 'undefined');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
};

console.log('Final DB Config:', {
  ...dbConfig,
  password: '***hidden***'
});

// Create connection pool
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Connected Successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Execute query function
export const executeQuery = async (query: string, params?: any[]) => {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  }
};