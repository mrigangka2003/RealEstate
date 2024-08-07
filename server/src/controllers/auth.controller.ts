import express ,{Request,Response ,NextFunction} from "express" ;
import bcrypt from 'bcrypt' ;
import prisma from "../../lib/prisma";
import jwt from 'jsonwebtoken' ;
import { jwtSecretKey } from "../config";


const register = async(req:Request, res:Response,next:NextFunction) =>{

   try {
        const {username , email,password} = req.body ;
    
        const hashedPass = await bcrypt.hash(password,10) ;
    
        const newUser = await prisma.user.create({
            data :{
                email,
                username,
                password:hashedPass 
            }
        })

        res.status(201).json({message:"User data successfully created"})

   }catch (error) {
        res.send('failed to create USER') 
        console.log(error) ;
   }

}
const login = async(req:Request, res:Response,next:NextFunction) =>{
    try {
        const {username , password} = req.body ;

        const user = await prisma.user.findUnique({
            where : {username }
        })
        
        if(!user)  return res.status(401).json({message :"User not found"}) ;
        
        const age :number = 1000*60*60*24*7 ;

        const token = jwt.sign(
            {
                id:user.id
            },
            jwtSecretKey,{
                expiresIn: age
            }
        )

        const isPasswordValid = await bcrypt.compare(password,user.password) ;
        if(!isPasswordValid){
            return res.status(401).json({message :"Wrong Password"}) ;
        }

        const options = {
            httpOnly:true
        }

        return res
        .status(200)
        .cookie("token", token ,options)
        .json({
            "message" :"Login Successfull"
        })

    } catch (error) {
        
    }
}
const logout = async(req:Request, res:Response,next:NextFunction) =>{
   res.clearCookie("token").status(200).json({message:"LogoutSuccessful"})
}

export {
    register,
    login,
    logout
}


