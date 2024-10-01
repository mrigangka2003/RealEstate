import { Request,Response } from "express";
import prisma from "../../lib/prisma";

const getChats = async(req :Request , res:Response) =>{
    const tokenUserId = (req as any).userId ;
    try {
        const chats = await prisma.chat.findMany({
            where :{
                userIds:{
                    hasSome:[tokenUserId]
                }
            }
        })

        res.status(200).json(chats) ;
    } catch (error) {
        console.log(error) ;
        res.status(403).json({message:"something went wrong"})
    }
}


const getChat = async(req :Request , res:Response) =>{
    const tokenUserId = (req as any).userId ;
    try {
        const chat = await prisma.chat.findUnique({
            where : {
                id : req.params.id,
                userIds:{
                    hasSome:[tokenUserId]
                }
            },
            include :{
                message:{
                    orderBy:{
                        createdAt :"asc"
                    }
                }
            }
        })

        await prisma.chat.update({
            where:{
                id : req.params.id,
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })

        return res.status(200).json(chat) ;
    } catch (error) {
        
    }
}

const addChat = async(req :Request , res:Response) =>{
    const tokenUserId = (req as any).userId ;
    try {
        const newChat = await prisma.chat.create({
            data:{
                userIds : [tokenUserId , req.body.receiverId]
            }
        })

        return res.status(200).json(newChat)
    } catch (error) {
        
    }
}


const readChat = async(req :Request , res:Response) =>{
    try {
        
    } catch (error) {
        
    }
}

export {
    getChats ,
    getChat ,
    addChat ,
    readChat
}