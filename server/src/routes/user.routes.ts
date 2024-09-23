import express from 'express' ;
import {getUser,getUsers,updateUser,deleteUser,updateAvatar,savePost,profilePosts} from "../controllers/index"
import {verifyToken} from "../middleware/verifyToken"
import {upload} from "../middleware/multer" ;
const router = express.Router() ;

router.get('/',getUsers);
// router.get('/:id',verifyToken,getUser);
router.put('/:id',verifyToken,updateUser);
router.put('/upload/:id',verifyToken, upload.single('avatar'),updateAvatar) ;
router.delete('/:id',verifyToken, deleteUser) ;
router.post('/save',verifyToken,savePost) ;
router.get('/profilePosts' , verifyToken , profilePosts);

export default router ;