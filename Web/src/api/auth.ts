import api from "../lib/axios";
import { User, UserLogin } from "../types";
import { isAxiosError } from "axios";

export async function login(userLogin: UserLogin) {
    try {
        const { data } = await api.post(`/auth`, userLogin)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
    }
}

export async function SignUp(userSignUp: User) {
    try {
        const { data } = await api.post(`/auth/signup`, userSignUp)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
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
        const { data } = await api(`/auth`, config);
        return  data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}