import express ,{Request,Response ,NextFunction} from "express" ;
import bcrypt from 'bcrypt' ;
import prisma from "../../lib/prisma";


const register = async(req:Request, res:Response,next:NextFunction) =>{
   try {
    const {username , email,password} = req.body ;
 
    const hashedPass = await bcrypt.hash(password,10) ;
    console.log("till that i have ran")
 
    const newUser = await prisma.user.create({
        data:{
            email,
            username,
            password:hashedPass 
        }
    })

    res.send("data saved") ;
    console.log(newUser) ;
   } catch (error) {
    console.log(error) ;
   }

}
const login = (req:Request, res:Response,next:NextFunction) =>{
    res.send('LoginBoy')
}
const logout = (req:Request, res:Response,next:NextFunction) =>{
    res.send('LogoutBoy')
}

export {
    register,
    login,
    logout
}


