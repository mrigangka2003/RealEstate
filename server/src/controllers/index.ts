import { register,login,logout } from "./auth.controller";
import { getUsers,getUser,updateUser,deleteUser,updateAvatar , savePost ,profilePosts } from "./user.controller";
import {getPost ,getPosts , deletePost ,updatePost ,createPost } from './post.controller' ;
export {
    register,
    login, 
    logout,
    
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateAvatar,
    savePost,
    profilePosts,

    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost,
}