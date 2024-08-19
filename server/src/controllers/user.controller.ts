import express ,{Request,Response ,NextFunction} from "express" ;
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt"
const getUsers = async(req:Request,res:Response)=>{
    try {
        const users = await prisma.user.findMany();
        res
        .status(200)
        .json(users) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"FAILED TO GET ALL THE USERS"}) ;
    }
}

const getUser = async(req:Request ,res:Response)=>{
    const {id} = req.params;
    try {
        if(id == null) {
            throw new Error('id invalid')
        }
        const user = await prisma.user.findUnique({
            where:{id} 
        })

        res
        .status(200)
        .json(user) ;

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"FAILED TO GET THE USER"}) ;
    }
}

const updateUser = async(req:Request ,res:Response)=>{
    const {id} = req.params ;
    const tokenUserId = (req as any).userId ;
    const {password,avatar,username,email} = req.body ;

    if(id !== tokenUserId){
        return res.status(403).json({message:"Invalid Request"})
    }

    let updatedPassword :string |null = null ;
    try {
        if(password && typeof password === 'string'){
            updatedPassword = await bcrypt.hash(password,10)
        }
        
        if(username || email){
            const existingUser = await prisma.user.findFirst({
                where:{
                    OR:[
                        {username:username},
                        {email:email}
                    ]
                }
            })

            if(existingUser && existingUser.id!==id){
                return res.status(409).json({
                    message:"The username or email already exists"
                })
            }
        }

        const updatedUser = await prisma.user.update({
            where:{id},
            data: {
                ...(username && {username}),
                ...(email && {email}),
                ...(updatedPassword && {password:updatedPassword}) ,
                ...(avatar && {avatar})
            }
        })
        //update data
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error) ;
        res.status(500).json({message:"Can't update data"})
    }
}
const deleteUser = async(req:Request ,res:Response)=>{
    const {id} = req.params ;

    const tokenUserId = (req as any).userId ;

    if(id!==tokenUserId){
        return res.status(403).json({
            message:"Not Authorized"
        })
    }

    try {
        await prisma.user.delete({
            where:{id}
        })

        res
        .status(200)
        .json({message :"User deleted Successfully"}) ;
    } catch (error) {
        console.log(error) ;
        res
        .status(500)
        .json({message :"Failed to delete user!"})
    }
}

export {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}