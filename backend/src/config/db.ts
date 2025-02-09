import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});

// Test the database connection
pool.connect()
    .then((client) => {
        console.log("✅ Database connected successfully!");
        client.release();
    })
    .catch((err) => {
        console.error("❌ Database connection error:", err.message);
    });

export default pool;
