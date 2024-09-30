import { Request,Response } from "express";
import prisma from "../../lib/prisma";

const addMessage = async(req:Request , res:Response)=>{
    try{
        res.status(200).json({message :"Message has been added"}) ;
    }catch(error){
        res.status(503).json({message:"FAILED TO ADD MESSAGE"}) ;
    }
}

export {
    addMessage ,
}