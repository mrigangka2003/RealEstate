import {Request ,Response } from "express" ;
import prisma from "../../lib/prisma";
import { uploadOnCloudinary } from "../helpers/cloudinary";
import { Prisma, PrismaClient, Property ,Type } from "@prisma/client";
import jwt from 'jsonwebtoken'
import {jwtSecretKey} from '../config'

interface paramsQueryInterface {
    city ?:string ,
    type ?:string ,
    property?: string;
    bedroom?: number;
    minPrice?: number;
    maxPrice?: number;
}

const getPosts = async(req:Request,res:Response)=>{   
    try {
        const query: paramsQueryInterface = {
            city: req.query.city as string | undefined,
            type: req.query.type as string | undefined,
            property: req.query.property as string | undefined,
            bedroom: req.query.bedroom ? parseInt(req.query.bedroom as string, 10) : undefined,
            minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string, 10) : undefined,
            maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string, 10) : undefined,
        };

        const where: Prisma.PostWhereInput = {
            ...(query.city !== 'undefined' || '' ? { city: query.city } : {}),
            ...(query.type && Object.values(Type).includes(query.type as Type) ? { type: query.type as Type } : {}),
            ...(query.property && Object.values(Property).includes(query.property as Property) ? { property: query.property as Property } : {}),
            ...(query.bedroom && query.bedroom > 0 ? { bedroom: query.bedroom } : {}),
            ...(query.minPrice || query.maxPrice ? {
            price: {
                ...(query.minPrice && query.minPrice > 0 ? { gte: query.minPrice } : {}),
                ...(query.maxPrice && query.maxPrice > 0 ? { lte: query.maxPrice } : {}),
            }
            } : {}),
        };

        const posts = await prisma.post.findMany({ where });
        if(!posts){
            return res.status(500).json({message:"Can't fetch all the data"}) ;
        }
        return res.status(200).json(posts);
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

        const token = req.cookies?.token;

        if (token) {
            jwt.verify(token as string, jwtSecretKey as string, async (err, payload) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
    
            const saved = await prisma.savedPost.findUnique({
                where: {
                    userId_postId: {
                        postId: id,
                        userId: (payload as jwt.JwtPayload).id,
                    },
                },
            });
                return res.status(200).json({ ...post, isSaved: saved ? true : false });
            });
        }else {
            return res.status(200).json({ ...post, isSaved: false });
        }
    } catch (error) {
        console.log(error) ;
        res.status(500).json({message:"Failed to get the post"}) ;
    }
}

const createPost = async (req: Request, res: Response) => {
    const { postData, postDetails } = req.body;
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
        
        
        postDetails.size = Number(postDetails.size)
        postDetails.bus = Number(postDetails.bus)
        postDetails.school = Number(postDetails.school)
        postDetails.restaurants = Number(postDetails.restaurants)
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
                    ...postDetails
                }
            }
        },
    });
    if (!newPost) {
        throw new Error("Failed to create post");
    }
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
    deletePost,

}