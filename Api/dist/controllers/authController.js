"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const utils_1 = require("../utils");
const prisma = new client_1.PrismaClient();
class AuthController {
    static registerUser = async (req, res) => {
        try {
            const user = req.body;
            const passwordHashed = await (0, utils_1.hashingPassword)(user.password);
            await prisma.user.create({
                data: {
                    name: user.name,
                    lastName: user.lastName,
                    password: passwordHashed,
                    email: user.email
                }
            });
            res.send('User created successfully');
        }
        catch (error) {
            res.status(401).send('Email is already exists');
        }
    };
    static auth = async (req, res) => {
        res.json(req.user);
    };
    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            });
            if (user) {
                if (!await (0, utils_1.checkPassword)(password, user.password)) {
                    res.status(401).send('Password is incorrect');
                    return;
                }
                const token = (0, utils_1.generateJWT)(user);
                res.send(token);
            }
            else {
                res.status(404).send('User not found');
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send('An error was ocurred');
        }
    };
}
exports.AuthController = AuthController;
