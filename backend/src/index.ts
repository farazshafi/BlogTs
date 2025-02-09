import express from "express";
import dotenv from "dotenv";
import pool from "./config/db";
import blogRoutes from "./routes/blogRouter"

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/blogs",blogRoutes)

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Database connected", time: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: `Database connection failed : ${error}` });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
