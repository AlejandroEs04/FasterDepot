import { useEffect, useState } from "react";
import { Cart, Product } from "../../../types";
import { useApp } from "../../../hooks/useApp";
import { currencyFormat, getTotal } from "../../../helpers";

export default function CheckoutListItem({ item } : { item: Cart }) {
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
    const { state } = useApp()
    
    useEffect(() => {
        if(state.products.length && item) {
            setCurrentProduct(state.products.filter(p => p.id === item.productId)[0])
        }
    }, [state.products])

    return (
        <tr>
            <td className="line-clamp-2">{currentProduct?.name}</td>
            <td className="text-end border-left text-nowrap">{currencyFormat(currentProduct?.price!)}</td>
            <td className="text-end border-left text-nowrap">{item.quantity} producto{item.quantity > 1 && 's'}</td>
            <td className="text-end border-left text-nowrap">{currencyFormat(getTotal(item.productId, item.quantity, state.products))}</td>
        </tr>
    )
}
