import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export class ProductController {
    static getProducts = async(req: Request, res: Response) => {
        try {
            const products = await prisma.product.findMany({
                include: {
                    sizes: {
                        include: {
                            size: true
                        }
                    }, 
                    category: true
                }
            })
            res.json(products)
            return 
        } catch (error) {
            console.log(error)
            res.status(500).send("Hubo un error")
        }
    }
}