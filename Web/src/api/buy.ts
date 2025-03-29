import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Address, Cart } from "../types";

type registerBuyReturn = {
    data: string, 
    cart: Cart[]
}

export async function registerBuy(paymentId: string, cart: Cart[], address: Address, email?: string, userId?: number) : Promise<registerBuyReturn | undefined> {
    try {
        const { data } : { data: string } = await api.post('/buy', { paymentId, cart, userId, address, email })
        return { data, cart }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}

export async function getPayerBuy(email: string) {
    try {
        const { data } = await api.post('/buy/payer', { email })
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}