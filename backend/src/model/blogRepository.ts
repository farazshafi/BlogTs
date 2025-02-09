import pool from "../config/db";
import { Blog } from "./blogModel";

export class BlogRepository {

    // create blog 
    static async createBlog(title: string, content: string, image: string) {
        const { rows } = await pool.query("INSERT INTO blogs (title,content,image) VALUES ($1,$2,$3) RETURNING *", [title, content, image])
        return rows[0]
    }

    static async getAllBlogs(): Promise<Blog[]> {
        const { rows } = await pool.query("SELECT * FROM blogs ORDER BY created_at DeSC")
        return rows
    }

    static async getBlogById(id: number): Promise<Blog | null> {
        const { rows } = await pool.query("SELECT * FROM blogs WHERE id = $1", [id])
        return rows.length ? rows[0] : null
    }
}