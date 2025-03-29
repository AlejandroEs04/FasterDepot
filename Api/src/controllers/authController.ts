import { Request, Response } from "express"
import { PrismaClient, User } from "@prisma/client"
import { checkPassword, generateJWT, hashingPassword } from "../utils"

const prisma = new PrismaClient()

export class AuthController {
    static registerUser = async(req: Request, res: Response) => {
        try {
            const user : User = req.body

            const passwordHashed = await hashingPassword(user.password)

            await prisma.user.create({
                data: {
                    name: user.name, 
                    lastName: user.lastName, 
                    password: passwordHashed, 
                    email: user.email,
                    number: user.number
                }
            })

            res.send('User created successfully')
        } catch (error) {
            res.status(401).send('Email is already exists')
        }
    }

    static auth = async(req: Request, res: Response) => {
        res.json(req.user)
    }

    static login = async(req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            if(user) {
                if(!await checkPassword(password, user.password)) {
                    res.status(401).send('Password is incorrect')
                    return
                }

                const token = generateJWT(user)
                res.send(token)
            } else {
                res.status(404).send('User not found')
            }

        } catch (error) {
            console.log(error)
            res.status(500).send('An error was ocurred')
        }
    }
}