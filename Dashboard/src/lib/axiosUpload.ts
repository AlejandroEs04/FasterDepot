import axios from "axios"

const apiFile = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

apiFile.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    config.headers["Content-Type"] = "multipart/form-data"
    console.log(config)
    return config
})

export default apiFile