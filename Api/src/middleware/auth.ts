import { PrismaClient, User } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

interface JwtPayload {
    id: number;
}

export async function getAuth(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.headers.authorization

        if(!token) {
            res.status(401).send('User is not login in')
            return
        }

        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET!) as JwtPayload

        const user = await prisma.user.findFirst({
            where: {
                id: +decoded.id
            }
        })

        if (!user) {
            res.status(404).send("User not found");
            return
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}