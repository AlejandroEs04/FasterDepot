import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import Stripe from "stripe"

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
            const { name, description, categoryId, price, imageUrl } = req.body;
      
            const stripeProduct = await stripe.products.create({
                name,
                description,
                images: [imageUrl],
            });
      
            const stripePrice = await stripe.prices.create({
                unit_amount: price * 100,
                currency: "usd",
                product: stripeProduct.id,
            });
      
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    categoryId,
                    price,
                    imageUrl,
                    stripeProductId: stripeProduct.id,
                    stripePriceId: stripePrice.id,
                },
            });
      
            res.json({ message: "Producto registrado correctamente", product: newProduct });
          } catch (error) {
            console.error("Error creando producto:", error);
            res.status(500).send("Hubo un error");
          }
    } 

    static uploadProduct = async(req: Request, res: Response) => {
        try {
            const product = req.body

            await prisma.product.update({
                where: {
                    id: product.id
                }, 
                data: {
                    name: product.name, 
                    price: product.price, 
                    wholesalePrice: product.wholesalePrice, 
                    description: product.description, 
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