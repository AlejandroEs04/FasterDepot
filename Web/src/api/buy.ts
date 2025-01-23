import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Address, Cart } from "../types";

export async function registerBuy(cart: Cart[], address: Address, email?: string, userId?: number) {
    try {
        const { data } = await api.post('/buy', { cart, userId, address, email })
        return data
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