import axios from "axios";
import { Blog } from "../types/types"

const url: string = `http://localhost:5000/api/blogs/`

export const getAllBlogsApi = async (): Promise<Blog[]> => {
    try {
        const response = await axios.get<Blog[]>(`${url}get_blogs`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || "Something went wrong!";
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

export const getBlogByIdApi = async (id: number): Promise<Blog> => {
    try {
        const response = await axios.get(`${url}get_blogs/${id}`)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || "axios error"
        } else {
            throw new Error("An unexpected error occurred")
        }
    }
}

export const deleteBlogByIdApi = async (id: number) => {
    try {
        const response = await axios.delete(`${url}delete_blog/${id}`)
        return response.data
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw err.response?.data?.message || "Something went wrong!";
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const createBlogApi = async (formData:FormData) => {
    try {
        const response = await axios.post(`${url}create_blog`,formData)
        return response.data
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw err.response?.data?.message || "Something went wrong!";
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const updateBlogApi = async (id:number,formData:FormData) => {
    try {
        const response = await axios.post(`${url}update_blog/${id}`,formData)
        return response.data
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw err.response?.data?.message || "Something went wrong!";
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}