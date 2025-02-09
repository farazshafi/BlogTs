import { Router } from "express";
import multer from "multer";
import { createBlog, getAllBlogs, getBlogById } from "../controllers/blogController";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


router.post("/create_blog", upload.single("image"), createBlog);
router.get("/get_blogs", getAllBlogs);
router.get("/get_blogs/:id", getBlogById);

export default router;
