"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyController = void 0;
const client_1 = require("@prisma/client");
const utils_1 = require("../utils");
const prisma = new client_1.PrismaClient();
class BuyController {
    static getPayerBuy = async (req, res) => {
        const { email } = req.body;
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
            });
            res.json(buys);
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Hubo un error");
        }
    };
    static registerBuy = async (req, res) => {
        const { cart, userId, address, email } = req.body;
        try {
            const products = await prisma.product.findMany();
            const amount = cart.reduce((total, product) => total + (0, utils_1.getTotal)(product.productId, product.quantity, products), 0);
            const buy = await prisma.buy.create({
                data: {
                    amount,
                    userId,
                    address: address.address +
                        ', C.P. ' + address.postalCode +
                        ', ' + address.city +
                        ', ' + address.state +
                        ', ' + address.country,
                    email
                }
            });
            const productsCart = cart.map(p => {
                const product = {
                    ...p,
                    pricePerUnit: products.filter(i => i.id === p.productId)[0].price,
                    buyId: buy.id
                };
                return product;
            });
            await prisma.productBuy.createMany({
                data: productsCart
            });
            res.send('Su compra se registro correctamente');
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    };
}
exports.BuyController = BuyController;
