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
            console.error("Error creando producto:", error);
            res.status(500).send("Hubo un error")
        }
    }

    static registerProduct = async(req: Request, res: Response) => {
        try {
            const product = req.body

            console.log(product)

            await prisma.product.create({
                data: {
                    name: product.name, 
                    description: product.description, 
                    categoryId: product.categoryId, 
                    price: product.price, 
                    imageUrl: product.imageUrl
                }
            })

            res.send('Producto registrado correctamente')
        } catch (error) {
            console.error("Error creando producto:", error);
            res.status(500).send('Hubo un error')
        }
    }
}