import { Request, Response } from "express";
import { BlogRepository } from "../model/blogRepository";

interface MulterRequest extends Request {
    file?: Express.Multer.File; // Extend Request type to include file
}

export const createBlog = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        const { title, content } = req.body;
        const image = req.file?.path

        if (!title || !content || !image) {
            res.status(400).json({ message: "Title and content are required" });
        }
        const newBlog = await BlogRepository.createBlog(title, content, String(image));
        res.status(201).json(newBlog);
    } catch (err: any) {
        res.status(500).json({ message: "Failed to create blog", error: err.message });
    }
};

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const allBlogs = await BlogRepository.getAllBlogs()
        res.status(201).json(allBlogs)
    } catch (err: any) {
        res.status(500).json({ message: "Failed to get all blog", error: err.message });
    }
}

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
    try{
        const {id} = req.params
        const blog = await BlogRepository.getBlogById(Number(id));
        res.status(200).json(blog)
    }catch(err:any){
        res.status(500).json({ message: "Failed to get blog", error:err.message });
    }
}
