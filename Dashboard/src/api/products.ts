import { isAxiosError } from "axios"
import api from "../lib/axios"

export async function getProducts() {
    try {
        const { data } = await api('/products')
        console.log(data[0])
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}