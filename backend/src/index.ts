import express from "express";
import dotenv from "dotenv";
import pool from "./config/db";
import blogRoutes from "./routes/blogRouter"
import path from "path";
import cors from "cors"


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
}));

const PORT = process.env.PORT || 3000;


app.use("/api/blogs",blogRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


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
