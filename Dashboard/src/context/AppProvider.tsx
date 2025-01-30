import { createContext, Dispatch, ReactNode, useEffect, useReducer, useState } from "react"
import { AppActions, AppReducer, AppState, initialState } from "../reducers/app-reducer"
import { authLogin } from "../api/login"
import { getProducts } from "../api/products"

type AppContextProps = {
    state: AppState, 
    dispatch: Dispatch<AppActions>
    logOut: () => void
    loading: boolean
    setLoading: Dispatch<React.SetStateAction<boolean>>
}

type AppProviderProps = {
    children: ReactNode
}

export const AppContext = createContext<AppContextProps>(null!)

export const AppProvider = ({children} : AppProviderProps) => {
    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const productsRequest = async() => dispatch({ type: 'set-products', payload: { products: await getProducts() } })

    useEffect(() => {
        const autenticarUsuario = async() => {
            const token = localStorage.getItem('token');
        
            if(!token) {
                setLoading(false)
                return
            }
        
            try {
                const auth = await authLogin(token)
                dispatch({ type: 'set-auth', payload: { auth } })
            } catch (error) {
                dispatch({ type: 'set-auth', payload: { auth: null } })
            } finally {
                setLoading(false)
            }
        }
        
        productsRequest()
        autenticarUsuario();
    }, [])
    
        const logOut = () => {
            localStorage.removeItem('token');
            dispatch({ type: 'set-auth', payload: { auth: null } })
        }
    

    return (
        <AppContext.Provider
            value={{
                state, 
                dispatch, 
                logOut, 
                loading, 
                setLoading
            }}
        >
            {children}
        </AppContext.Provider>
    )
}