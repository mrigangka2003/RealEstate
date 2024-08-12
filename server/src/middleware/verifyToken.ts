import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../config";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Not Authenticated" });

        const payload: any = jwt.verify(token, jwtSecretKey); 
        req.userId = payload.id; 
        next(); 

    } catch (err) {
        return res.status(403).json({ message: "Token is not valid" });
    }
};
