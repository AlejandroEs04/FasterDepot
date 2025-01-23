import { isAxiosError } from "axios"
import api from "../lib/axios"

export async function createOrder(amount: number) {
    try {
        const { data } = await api.post(`/checkout/create-order`, { amount })
        return data.id
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}

export async function captureOrder(orderId: string) {
    try {
        const { data } = await api.post(`/checkout/capture-order`, { orderId })
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}