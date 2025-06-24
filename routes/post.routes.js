import {Router} from "express";

import { createPost,filter_post_details,getAllPosts } from "../controllers/post.controller.js";
import { deletePost } from "../controllers/post.controller.js";
import { updatePost } from "../controllers/post.controller.js";
import { upload } from "../cloudConfig.js";
// import multer from "multer"
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"./uploads")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })
// const upload=multer({storage})

const router=Router();

router.route('/create_post_byUser').post(upload.single('media'),createPost);
router.route('/get_all_posts').get(getAllPosts);
router.route('/delete_post_by_user').delete(deletePost);
router.route('/update_post_by_user').patch(updatePost);
router.route('/filter_post_data').get(filter_post_details)

export default router;