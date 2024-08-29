import express ,{Request,Response ,NextFunction} from "express" ;
import bcrypt from 'bcrypt' ;
import prisma from "../../lib/prisma";
import jwt from 'jsonwebtoken' ;
import { jwtSecretKey } from "../config";


const register = async(req:Request, res:Response,next:NextFunction) =>{

    try {
        const {username , email,password} = req.body ;
    
        const existingUser = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:email},
                    {username:username}
                ]
            }
        })

        if(existingUser){
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

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
    const {username , password} = req.body ;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(401).json({ message: "INVALID CREDENTIALS" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "INVALID credentials" });
        }

        const age = 1000 * 60 * 60 * 24 * 7; // 1 week

        const token = jwt.sign(
            { 
                id: user.id,
            },
            jwtSecretKey,
            { expiresIn: age }
        );

        const {password:userPassword, ...userInfo} = user

        res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .json(userInfo);

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Failed to login" });
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


