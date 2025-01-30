import { isAxiosError } from "axios"
import api from "../lib/axios"
import { ProductRegister } from "../types"

export async function getProducts() {
    try {
        const { data } = await api('/products')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function registerProducts(product : ProductRegister) {
    try {
        const { data } = await api.post('/products', product)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}