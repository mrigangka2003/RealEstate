import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../config";

export const shouldBeLoggedIn = async (req: Request, res: Response) => {
    console.log(req.userId)
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not Authenticated" });

    jwt.verify(token, jwtSecretKey, async (err: any, payload: any) => {
        if (err) return res.status(403).json({ message: "Token is not valid" });

        // If token is valid, proceed with the next steps
        res.status(200).json({ message: "You are Authenticated" });
    });
};

export const shouldBeAdmin = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not Authenticated" });

    jwt.verify(token, jwtSecretKey, async (err: any, payload: any) => {
        if (err) return res.status(403).json({ message: "Token is not valid" });

        if (!payload.isAdmin) {
            return res.status(403).json({ message: "You are not an ADMIN" });
        }

        // If user is an admin, proceed with the next steps
        res.status(200).json({ message: "You are Authenticated" });
    });
};
