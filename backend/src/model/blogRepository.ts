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

    static async updateBlogById(id?: number, title?: string, content?: string, image?: string): Promise<Blog> {
        let query = 'UPDATE blogs SET '
        const Values: any[] = []
        let index = 1

        if (title) {
            query += `title = $${index},`
            Values.push(title)
            index++
        }
        if (content) {
            query += `content = $${index},`
            Values.push(content)
            index++
        }
        if (image) {
            query += `image = COALESCE($${index},image)`
            Values.push(image)
            index++
        }

        query = query.slice(0, -1) + ` WHERE id = $${index} RETURNING *`
        Values.push(id)

        const { rows } = await pool.query(query, Values)
        return rows[0]

    }

    static async deleteBlogById(id: number): Promise<Blog> {
        const { rows } = await pool.query("DELETE FROM blogs Where id = $1 RETURNING *", [id])
        return rows[0]
    }
}