import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { Address, ProductCart } from "../types"
import { getTotal } from "../utils"

const prisma = new PrismaClient()

export class BuyController {
    static getAllBuys = async(req: Request, res: Response) => {
        try {
            const buys = await prisma.buy.findMany()
            res.json(buys)
        } catch (error) {
            console.log(error)
            res.status(500).json("Hubo un error")
        }
    }

    static getPayerBuy = async(req: Request, res: Response) => {
        const { email } : { email: string } = req.body
        
        try {
            const buys = await prisma.buy.findMany({
                where: {
                    email, 
                    userId: null
                }, 
                include: {
                    productBuy: {
                        include: {
                            product: true
                        }
                    }
                }
            })

            res.json(buys)
        } catch (error) {
            console.log(error)
            res.status(500).json("Hubo un error")
        }
    }

    static registerBuy = async(req: Request, res: Response) => {
        const { cart, userId, address, email, paymentId } : 
            { cart: ProductCart[], userId: number, address: Address, email: string, paymentId: string } = req.body

        try {
            const products = await prisma.product.findMany()

            const amount = cart.reduce((total, product) => total + getTotal(product.productId, product.quantity, products), 0)

            const existsBuy = await prisma.buy.findUnique({
                where: {
                    paymentId
                }
            })

            const buy = await prisma.buy.create({
                data: {
                    amount, 
                    userId,
                    address: address.address + 
                        ', C.P. ' + address.postalCode + 
                        ', ' + address.city + 
                        ', ' + address.state + 
                        ', ' + address.country, 
                    email, 
                    paymentId
                }
            })

            const productsCart = cart.map(p => {
                const product : ProductCart = {
                    productId: p.productId, 
                    sizeId: p.sizeId, 
                    quantity: p.quantity,
                    pricePerUnit: products.filter(i => i.id === p.productId)[0].price, 
                    buyId: buy.id
                }

                return product
            })

            await prisma.productBuy.createMany({
                data: productsCart
            })

            res.send('Se ha realizado la compra con éxito')
        } catch (error) {
            res.status(500).send('Hubo un error')
        }
    }
}