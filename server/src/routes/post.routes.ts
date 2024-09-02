import express from 'express' ;
import { verifyToken } from '../middleware/verifyToken';
import { upload } from '../middleware/multer';
import { getPost,getPosts ,createPost,deletePost,updatePost } from '../controllers';

const router = express.Router() ;

router.get('/', getPosts) ;
router.get('/:id',getPost) ;
router.post('/',verifyToken,
    upload.fields([
        {
            name:"postData[images]",
            maxCount:5
        }
    ])
    ,createPost) ;
router.put('/:id',verifyToken ,updatePost) ;
router.delete('/:id',verifyToken ,deletePost) ;

export default router ;