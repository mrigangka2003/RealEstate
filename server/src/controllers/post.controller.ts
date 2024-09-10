import {Request ,Response } from "express" ;
import prisma from "../../lib/prisma";
import { uploadOnCloudinary } from "../helpers/cloudinary";
import { parse } from "dotenv";

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
    console.log(id) ;
    try {
        const post = await prisma.post.findUnique({
            where:{
                id
            },
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

const createPost = async (req: Request, res: Response) => {
    const { postData, postDetails } = req.body;
    console.log(typeof(parseInt(postDetails.size))) ;
    const tokenUserId = (req as any).userId;
    const files = req?.files ? (req as any).files['postData[images]'] : undefined;

    const imageUrls: string[] = [];
    try {

        if (files && Array.isArray(files)) {
        for (const file of files) {
            const uploadResult = await uploadOnCloudinary(file.path);
            if (uploadResult && uploadResult.url) {
                imageUrls.push(uploadResult.url);
            }
            }
        }
        const price = parseInt(postData.price, 10);
        const bedroom = parseInt(postData.bedroom, 10);  
        const bathroom = parseInt(postData.bathroom, 10); 
        
        

        const newPost = await prisma.post.create({
        data: {
            title: postData.title,
            price,
            address: postData.address,
            city: postData.city,
            bedroom, 
            bathroom, 
            type: postData.type,
            property: postData.property,
            latitude: postData.latitude,
            longitude: postData.longitude,
            image: imageUrls,
            userId: tokenUserId,
            postDetails: 
            { 
                create:{
                    size : "2",
                    ...postDetails
                }
            }
        },
    });
    if (!newPost) {
        throw new Error("Failed to create post");
    }
    console.log(newPost) ;
    return res.status(200).json(newPost);
    } catch (error) {
        console.log((error as any).message);
        return res.status(403).json({ message: "Something went wrong while creating post" });
    }
};

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