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
    const {password, ...inputs} = req.body ;

    if(id !== tokenUserId){
        return res.status(403).json({message:"Invalid Request"})
    }

    let updatedPassword :string |null = null ;
    try {
        if(password && typeof password === 'string'){
            updatedPassword = await bcrypt.hash(password,10)
        }


        const updatedUser = await prisma.user.update({
            where:{id},
            data: {
                ...inputs,
                ...(updatedPassword && {password:updatedPassword}) 
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

}

export {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}