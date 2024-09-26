import { 
    register,
    login,
    logout 
} from "./auth.controller";

import { 
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateAvatar,
    savePost,
    profilePosts 
} from "./user.controller";

import {
    getPost,
    getPosts ,
    deletePost,
    updatePost,
    createPost 
} from './post.controller' ;

import {
    getChats,
    getChat ,
    addChat,
    readChat
} from "./chat.controller"

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

    getChats,
    getChat,
    addChat,
    readChat
}