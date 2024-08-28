import { register,login,logout } from "./auth.controller";
import { getUsers,getUser,updateUser,deleteUser,updateAvatar } from "./user.controller";
import {getPost ,getPosts , deletePost ,updatePost ,createPost} from './post.controller' ;
export {
    register,
    login, 
    logout,
    
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateAvatar,

    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost
}