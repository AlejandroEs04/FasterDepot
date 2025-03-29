import { createContext, Dispatch, ReactNode, useEffect, useReducer, useState } from "react"
import { AppActions, AppReducer, AppState, initialState } from "../reducers/app-reducer"
import { authLogin } from "../api/login"
import { getProducts } from "../api/products"
import { Cart } from "../types"
import { toast } from 'react-toastify'

type AppContextProps = {
    state: AppState, 
    dispatch: Dispatch<AppActions>
    logOut: () => void
    loading: boolean
    setLoading: Dispatch<React.SetStateAction<boolean>>
    saveCart: ({ productId, sizeId, quantity }: Cart, noMessage?: boolean) => void
}

type AppProviderProps = {
    children: ReactNode
}

export const AppContext = createContext<AppContextProps>(null!)

export const AppProvider = ({children} : AppProviderProps) => {
    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const setProducts = async() => {
        setLoading(true)
        try {
            dispatch({ type: 'set-products', payload: { products: await getProducts() } })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const saveCart = ({ productId, sizeId = null, quantity = 1, stripePriceId } : Cart, noMessage: boolean = false) => {
        dispatch({ type: 'add-cart', payload: { product: { productId, sizeId, quantity, stripePriceId } } })

        if(!noMessage)
            toast.success('Producto guardado al carrito')
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])
    
    useEffect(() => {
        localStorage.setItem('address', JSON.stringify(state.address))
    }, [state.address])

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
    
        autenticarUsuario();
        setProducts()
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
                setLoading, 
                saveCart
            }}
        >
            {children}
        </AppContext.Provider>
    )
}