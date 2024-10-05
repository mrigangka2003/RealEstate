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
    profilePosts,
    getNotificationNumber
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

import {
    addMessage
} from "../controllers/message.controller"

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
    getNotificationNumber,

    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost,

    getChats,
    getChat,
    addChat,
    readChat,

    addMessage
}