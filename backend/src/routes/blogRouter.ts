import { Router } from "express";
import multer from "multer";
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


router.post("/create_blog", upload.single("image"), createBlog);
router.get("/get_blogs", getAllBlogs);
router.get("/get_blogs/:id", getBlogById);
router.post("/update_blog/:id", upload.single("image") ,updateBlog);
router.delete("/delete_blog/:id",deleteBlogById);

export default router;
