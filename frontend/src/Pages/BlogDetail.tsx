import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getBlogByIdApi } from "../apis/blogApi"
import { Blog } from "../types/types"
import { toast } from "sonner"
import ShinyText from "../Component/ShinyText/ShinyText"

const BlogDetail = () => {
    const params = useParams()
    const id = params.id

    const [blog, setBlog] = useState<Blog>()


    const getBlogDetails = async () => {
        try {
            const data = await getBlogByIdApi(Number(id))
            setBlog(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }

    useEffect(() => {
        getBlogDetails()
    }, [])

    return (
        <>
            <Link to={"/explore"}> 
                <button className='bg-slate-800 text-white mt-2 px-3 py-2 ml-4 mb-3 rounded'>
                    <ShinyText text="Back" disabled={false} speed={3} className='shiny-text' />
                </button>
            </Link>
            {blog && (
                <div className="flex justify-center h-screen">
                    <div className="w-1/2">
                        <div className="flex justify-center">
                            <img className="w-48 h-48 object-cover rounded" src={`http://localhost:5000/${blog.image}`} alt={blog.title} />
                        </div>

                        <div className="mt-4">
                            <h2 className="text-2xl font-semibold text-center">{blog.title}</h2>
                            <p className="mt-2  text-justify">{blog.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BlogDetail