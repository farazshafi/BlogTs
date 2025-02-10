import { Link } from 'react-router-dom';
import ShinyText from '../Component/ShinyText/ShinyText';
import SpotlightCard from '../Component/SpotlightCard/SpotlightCard';
import { useEffect, useState } from 'react';
import { getAllBlogsApi } from '../apis/blogApi';
import { toast } from "sonner";
import { Blog } from '../types/types';

const Explore: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getAllBlogs = async () => {
    try {
      const data: Blog[] = await getAllBlogsApi();
      console.log("data: ", data)
      setBlogs(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className='px-5'>
      <p className='text-center font-poppins text-3xl my-5'>Explore Blogs</p>
      <Link to={"/"}>
        <button className='bg-slate-800 text-white mt-2 px-3 py-2 rounded'>
          <ShinyText text="Home" disabled={false} speed={3} className='shiny-text' />
        </button>
      </Link>

      {blogs.length > 0 && (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
          {blogs.map((blog) => (
            <SpotlightCard key={blog.id} className="custom-spotlight-card rounded-[10px]" spotlightColor="rgba(0, 229, 255, 0.2)">
              <div>
                <div className='flex justify-center items-center'>
                  <img className='h-[100px] rounded my-3 object-contain' src={`http://localhost:5000/${blog.image}`} alt={blog.title} />
                </div>
                <p className='text-white font-poppins text-xl text-center'>{blog.title}</p>
                <Link to={`/blog/${blog.id}`}>
                  <button className='bg-slate-800 w-full text-center text-white mt-2 px-3 py-2 rounded'>
                    <ShinyText text="GO" disabled={false} speed={3} className='shiny-text' />
                  </button>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
