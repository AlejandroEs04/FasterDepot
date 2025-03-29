import { useMemo } from 'react'
import { useApp } from '../../hooks/useApp'
import CheckoutListItem from './CheckoutListItem/CheckoutListItem'
import { currencyFormat, getTotal } from '../../helpers'
import styles from './CheckoutList.module.css'
import { Cart } from '../../types'

export default function CheckoutList({ products = [] } : { products? : Cart[] }) {
    const { state } = useApp()

    const subtotal = useMemo(() => state.cart.reduce((total, product) => total + getTotal(product.productId, product.quantity, state.products), 0), [state.cart, state.products])
    const qtyProducts = useMemo(() => state.cart.reduce((total, product) => total + product.quantity, 0), [state.cart])

    return (
        <div className={styles.scrollContainer}>
            <div className={styles.scroll}>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th className='text-end'>Precio</th>
                            <th className='text-end'>Cantidad</th>
                            <th className='text-end'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.cart.map(i => (
                            <CheckoutListItem key={`${i.productId}${i.sizeId}`} item={i} />
                        ))}

                        {products.map(i => (
                            <CheckoutListItem key={`${i.productId}${i.sizeId}`} item={i} />
                        ))}

                        <tr className='border-top'>
                            <th></th>
                            <th className='text-end'>Total:</th>
                            <th className='text-end text-nowrap'>{qtyProducts} producto{qtyProducts > 1 && 's'}</th>
                            <th className='text-end'>{currencyFormat(subtotal)}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
