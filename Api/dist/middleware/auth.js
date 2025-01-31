"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth = getAuth;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
async function getAuth(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) {
            res.status(401).send('User is not login in');
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const user = await prisma.user.findFirst({
            where: {
                id: +decoded.id
            }
        });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
    }
}
