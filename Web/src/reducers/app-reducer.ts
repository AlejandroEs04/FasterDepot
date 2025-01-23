import { Address, Alert, Buy, Cart, Product, User } from '../types'

export type AppActions = 
    { type: 'set-products', payload: { products: Product[] } } | 
    { type: 'set-auth', payload: { auth: User | null } } | 
    { type: 'set-alert', payload: { alert: Alert | null } } |
    { type: 'add-cart', payload: { product: Cart } } | 
    { type: 'delete-cart', payload: { product: Cart } } | 
    { type: 'update-address', payload: { address: Address } } | 
    { type: 'reset-cart' } | 
    { type: 'set-purchases', payload: { purchases: Buy[] } }

export type AppState = {
    auth: User | null
    alert: Alert | null
    products: Product[]
    cart: Cart[]
    address: Address
    purchases: Buy[]
}

const addressInitiasState = {
    address: '', 
    city: '', 
    state: '', 
    country: 'México', 
    postalCode: ''
}

const localStorageCart = () : Cart[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : []
}

const localStorageAddress = () : Address => {
    const address = localStorage.getItem('address');
    return address ? JSON.parse(address) : addressInitiasState
}

export const initialState : AppState = {
    auth: null, 
    alert: null, 
    products: [], 
    cart: localStorageCart(),
    address: localStorageAddress(),
    purchases: []
}

export const AppReducer = (
    state: AppState = initialState, 
    actions: AppActions
) => {
    if(actions.type === 'set-products') {
        return {
            ...state, 
            products: actions.payload.products
        }
    }
    if(actions.type === 'set-auth') {
        return {
            ...state, 
            auth: actions.payload.auth
        }
    }
    if(actions.type === 'set-alert') {
        return {
            ...state, 
            alert: actions.payload.alert
        }
    }
    if(actions.type === 'add-cart') {
        let newCart 
        const existsProduct = state.cart.filter(p => p.productId === actions.payload.product.productId && p.sizeId === actions.payload.product.sizeId).length > 0

        if(existsProduct) {
            const filterCart = state.cart.filter(p => (p.productId !== actions.payload.product.productId || p.sizeId !== actions.payload.product.sizeId))
            newCart = [
                ...filterCart, 
                actions.payload.product
            ]
        } else {
            newCart = [
                ...state.cart, 
                actions.payload.product
            ]
        }

        return {
            ...state, 
            cart: newCart
        }
    }
    if(actions.type === 'delete-cart') {
        return {
            ...state, 
            cart: state.cart.filter(p => (p.productId !== actions.payload.product.productId || p.sizeId !== actions.payload.product.sizeId))
        }
    }
    if(actions.type === 'update-address') {
        return {
            ...state, 
            address: actions.payload.address
        }
    }
    if(actions.type === 'reset-cart') {
        return {
            ...state, 
            cart: []
        }
    }
    if(actions.type === 'set-purchases') {
        return {
            ...state, 
            purchases: actions.payload.purchases
        }
    }

    return state
}