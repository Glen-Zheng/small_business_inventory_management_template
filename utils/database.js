import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: process.env.DB_SSL_CA,
  },
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

testConnection();

export default pool;
