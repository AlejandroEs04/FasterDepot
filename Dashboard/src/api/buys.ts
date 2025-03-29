import { isAxiosError } from "axios"
import api from "../lib/axios"

export async function getAllBuys() {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const { data } = await api('/buy', config)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}