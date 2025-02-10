import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogByIdApi, updateBlogApi } from "../apis/blogApi";
import { Blog } from "../types/types";
import { toast } from "sonner";
import ShinyText from "../Component/ShinyText/ShinyText";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Prevent accessibility warning

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);

    // Fetch Blog Details
    const getBlogDetails = async () => {
        try {
            const data = await getBlogByIdApi(Number(id));
            setBlog(data);
            setTitle(data.title);
            setContent(data.content);
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
        }
    };

    useEffect(() => {
        getBlogDetails();
    }, []);

    // Handle File Upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // Handle Edit Submit
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            toast.error("Title and content cannot be empty.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            await updateBlogApi(Number(id), formData);
            toast.success("Blog updated successfully!");
            setIsModalOpen(false);
            getBlogDetails(); // Refresh data
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
            <Link to="/explore">
                <button className="bg-slate-800 text-white mt-2 px-3 py-2 ml-4 mb-3 rounded">
                    <ShinyText text="Back" disabled={false} speed={3} className="shiny-text" />
                </button>
            </Link>

            {blog && (
                <div className="flex justify-center h-screen">
                    <div className="w-1/2">
                        <div className="flex justify-center">
                            <img className="w-48 h-48 object-cover rounded" src={`http://localhost:5000${blog.image}`} alt={blog.title} />
                        </div>

                        <div className="mt-4">
                            <h2 className="text-2xl font-semibold text-center">{blog.title}</h2>
                            <button
                                className="text-white w-full hover:bg-slate-400 bg-slate-700 p-3 rounded"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Edit
                            </button>
                            <p className="mt-2 text-justify">{blog.content}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="overlay">
                <div className="bg-white p-5 rounded shadow-lg w-96 mx-auto">
                    <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
                    <form onSubmit={handleEditSubmit}>
                        <input
                            className="w-full border p-2 mb-2"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="w-full border p-2 mb-2"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <input type="file" className="mb-2" onChange={handleImageChange} />
                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default BlogDetail;
