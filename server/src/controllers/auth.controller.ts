import express ,{Request,Response ,NextFunction} from "express" ;
import bcrypt from 'bcrypt' ;
import prisma from "../../lib/prisma";
import jwt from 'jsonwebtoken' ;


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
        

        const isPasswordValid = await bcrypt.compare(password,user.password) ;
        if(!isPasswordValid){
            return res.status(401).json({message :"Wrong Password"}) ;
        }

        const options = {
            httpOnly:true
        }

        return res
        .status(200)
        .cookie("test", "myvalue" ,options)
        .json({
            "message" :"Login Successfull"
        })

    } catch (error) {
        
    }
}
const logout = (req:Request, res:Response,next:NextFunction) =>{
    res.send('LogoutBoy')
}

export {
    register,
    login,
    logout
}


