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
    try {
        
    } catch (error) {
        
    }
}

const addChat = async(req :Request , res:Response) =>{
    try {
        
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