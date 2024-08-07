import { Request,Response,NextFunction } from "express";

type AsyncFunction = (
    req:Request,
    res:Response,
    next: NextFunction
)=>Promise<any>


// export default (execution:AsyncFunction)=>{
//     (req:Request,res:Response,next:NextFunction)=>{
//         execution(req,res,next).catch(next) ;
//     }
// }

const asyncHandler = (requestHandler : AsyncFunction)=>{
    return(req:Request,res:Response,next :NextFunction)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler} 