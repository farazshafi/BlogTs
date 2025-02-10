import React, { useState } from 'react'
import { toast } from 'sonner';
import { createBlogApi } from '../apis/blogApi';
import { Link } from 'react-router-dom';
import ShinyText from '../Component/ShinyText/ShinyText';

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content || !image) {
            toast.error("Please fill in all fields and select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);

        try {
            await createBlogApi(formData); // Call API function
            toast.success("Blog created successfully!");
            setTitle("");
            setContent("");
            setImage(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
              toast.error(error.message);
            } else {
              toast.error("An unexpected error occurred");
            }
          }
    };

    return (
        <>
            <Link to={"/"}>
                <button className='bg-slate-800 text-white mt-2 px-3 py-2 rounded hover:bg-slate-900 transition-colors duration-300'>
                    <ShinyText text="Home" disabled={false} speed={3} className='shiny-text' />
                </button>
            </Link>

            <h1 className="text-2xl text-center my-4 font-poppins">Create Blog</h1>
            <div className="w-full p-3 flex justify-center">
                <form onSubmit={handleSubmit} className="w-1/2 bg-white p-5 shadow-md rounded">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Enter blog title"
                        className="w-full p-2 border rounded mb-3"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Content */}
                    <textarea
                        placeholder="Enter blog content"
                        className="w-full p-2 border rounded mb-3"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {/* Image Upload */}
                    <input
                        type="file"
                        className="w-full p-2 border rounded mb-3"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateBlog