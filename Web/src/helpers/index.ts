import { Product } from "../types";

export const currencyFormat = (amount : number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export const getTotal = (id: number, qty: number, items: Product[]) => {
    if(items.length === 0) return 0

    let total = 0
    const product = items.filter(p => p.id === id)[0]
        
    if(product.wholesalePrice && product.wholesalePrice > 0) {
        if(qty >= 10) {
            let qtyRest = qty
            while (qtyRest >= 10) {
                total += product.wholesalePrice
                qtyRest -= 10
            }

            total += product.price * qtyRest
            return total
        } else {
            total += product.price * qty
        }
    } else {
        total = product.price * qty
    }

    return total
}