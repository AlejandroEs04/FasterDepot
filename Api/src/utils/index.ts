import { Product } from "../types"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "@prisma/client"

export const getTotal = (id: number, qty: number, items: Product[]) => {
    if(items.length === 0) return 0

    let total = 0
    const product = items.filter(p => p.id === id)[0]
        
    if(product.wholesalePrice && product.wholesalePrice > 0) {
        if(qty >= 10) {
            let qtyRest = qty
            while (qtyRest >= 10) {
                total += product.wholesalePrice
                qtyRest -= 10
            }

            total += product.price * qtyRest
            return total
        } else {
            total += product.price * qty
        }
    } else {
        total = product.price * qty
    }

    return total
}

export const hashingPassword = async(password : string) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt)

    return passwordHashed
}

export const checkPassword = async (enteredPassword: string, storedHash: string) => {
    return await bcrypt.compare(enteredPassword, storedHash)
}

export const generateJWT = (payload: User) => {
    const { password, ...user } = payload

    const token = jwt.sign(user, process.env.JWT_SECRET!, {
        expiresIn: '1d'
    })
    return token
}