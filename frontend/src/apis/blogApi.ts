import axios from "axios";
import { Blog } from "../types/types"

const url: string = `http://localhost:5000/api/blogs/`

export const getAllBlogsApi = async (): Promise<Blog[]> => {
    try {
        const response = await axios.get<Blog[]>(`${url}get_blogs`)
        return response.data
    } catch (error: any){
        throw error.response?.data?.message || "Something went wrong!";
    }
}