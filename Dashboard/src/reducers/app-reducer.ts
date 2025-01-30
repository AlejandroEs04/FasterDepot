import { Alert, Link, Product, User } from '../types'

export type AppActions = 
    { type: 'change-routes', payload: { routes: Link[] } } | 
    { type: 'set-auth', payload: { auth: User | null } } | 
    { type: 'set-alert', payload: { alert: Alert | null } } | 
    { type: 'show-login' } | 
    { type: 'show-signUp' } | 
    { type: 'hide-modal' } |
    { type: 'set-products', payload: { products: Product[] } }

export type AppState = {
    routes: Link[]
    auth: User | null
    alert: Alert | null
    products: Product[]
}

export const initialState : AppState = {
    routes: [
        {
            name: 'Overview', 
            url: '/'
        }
    ], 
    auth: null, 
    alert: null, 
    products: []
}

export const AppReducer = (
    state: AppState = initialState, 
    actions: AppActions
) => {
    if(actions.type === 'change-routes') {
        return {
            ...state, 
            routes: actions.payload.routes
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
    if(actions.type === 'set-products') {
        return {
            ...state, 
            products: actions.payload.products
        }
    }

    return state
}