"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.checkPassword = exports.hashingPassword = exports.getTotal = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getTotal = (id, qty, items) => {
    if (items.length === 0)
        return 0;
    let total = 0;
    const product = items.filter(p => p.id === id)[0];
    if (product.wholesalePrice && product.wholesalePrice > 0) {
        if (qty >= 10) {
            let qtyRest = qty;
            while (qtyRest >= 10) {
                total += product.wholesalePrice;
                qtyRest -= 10;
            }
            total += product.price * qtyRest;
            return total;
        }
        else {
            total += product.price * qty;
        }
    }
    else {
        total = product.price * qty;
    }
    return total;
};
exports.getTotal = getTotal;
const hashingPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const passwordHashed = await bcrypt_1.default.hash(password, salt);
    return passwordHashed;
};
exports.hashingPassword = hashingPassword;
const checkPassword = async (enteredPassword, storedHash) => {
    return await bcrypt_1.default.compare(enteredPassword, storedHash);
};
exports.checkPassword = checkPassword;
const generateJWT = (payload) => {
    const { password, ...user } = payload;
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    return token;
};
exports.generateJWT = generateJWT;
