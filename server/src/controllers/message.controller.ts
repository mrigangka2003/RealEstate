import { Request,Response } from "express";
import prisma from "../../lib/prisma";

const addMessage = async(req:Request , res:Response)=>{
    const tokenUserId = (req as any).userId ;
    const {chatId} = req.params ;
    const {text} = req.body ;
    try{
        const chat = await prisma.chat.findUnique({
            where : {
                id : chatId ,
                userIds :{
                    hasSome:[tokenUserId]
                }
            }
        })

        if(!chat) return res.status(403).json({message :"Chat not found"}) ;

        const message =  await prisma.message.create({
            data:{
                text ,
                chatId ,
                userId : tokenUserId
            }
        })

        await prisma.chat.update({
            where :{
                id: chatId
            },
            data:{
                seenBy:[tokenUserId] ,
                lastMessage:text 
            }
        })

        return res.status(200).json(message) ;
    }catch(error){
        res.status(503).json({message:"FAILED TO ADD MESSAGE"}) ;
    }
}

export {
    addMessage ,
}