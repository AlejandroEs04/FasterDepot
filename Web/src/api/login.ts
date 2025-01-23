import { isAxiosError } from "axios";
import api from "../lib/axios";

type loginCredentials = {
    email: string, 
    password: string
}

export async function login({email, password} : loginCredentials) {
    try {
        const { data } = await api.post(`/api/users/login`, {
            email, password
        })
        return data.token
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}

export async function authLogin(token:string) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const { data } = await api(`/api/users/porfile`, config);
        return  data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}