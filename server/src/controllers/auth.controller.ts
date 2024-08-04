import express ,{Request,Response ,NextFunction} from "express" ;
const register = (req:Request, res:Response,next:NextFunction) =>{
    res.send("RegisterBoy")
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


