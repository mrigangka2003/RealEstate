import {Request ,Response } from "express" ;
import prisma from "../../lib/prisma";

const getPosts = async(req:Request,res:Response)=>{
    try {
        const posts = await prisma.post.findMany() ;
        if(!posts){
            return res.status(500).json({message:"Can't fetch all the data"}) ;
        }

        return res.status(200).json(posts) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).json({message:"Failed to get all the posts"}) ;
    }
}

const getPost=async(req:Request,res:Response)=>{
    const {id}= req.params ;
    try {
        
        const post = await prisma.post.findUnique({
            where:{id},
            include:{
                postDetails :true ,
                user:{
                    select:{
                        username:true ,
                        avatar:true
                    }
                }
            }
        })

        if(!post){
            return res.status(500).json({message:"The post is not found"})
        }


        return res.status(200).json(post) ;

    } catch (error) {
        console.log(error) ;
        res.status(500).json({message:"Failed to get the post"}) ;
    }
}

const createPost = async(req:Request,res:Response)=>{
    const body = req.body ;
    const tokenUserId = (req as any).userId ;
    try {
        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId : tokenUserId,
                postDetails:{
                    create:body.postDetails,
                }
            }
        })

        if(!newPost){
            throw new Error() ;
        }

        return res.status(200).json(newPost) ;
    } catch (error) {
        console.log((error as any).message)
        return res.status(403).json({message:"Something went wrong while creating post"} )
    }
}

const updatePost =async(req:Request,res:Response)=>{
    const {id} = req.params ;
    const tokenUserId = (req as any).userId ;
    try {
        
    } catch (error) {
        
    }
}

const deletePost =async(req:Request,res:Response)=>{

    const {id} = req.params ;

    const tokenUserId = (req as any).userId ;
    try {
        const post = await prisma.post.findUnique({
            where:{id}
        })


        if(post?.userId !== tokenUserId){
            return res.status(403).json({message :"not authorized"}) ;
        }

        await prisma.post.delete({
            where:{id}
        })

        return res.status(200).json({message:"post deleted"}) ;
    } catch (error) {
        console.log(error) ;
        return res.status(501).json({message:"something went wrong"})
    }
}

export{
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}