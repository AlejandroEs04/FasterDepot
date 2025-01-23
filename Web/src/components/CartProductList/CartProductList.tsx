import { useApp } from '../../hooks/useApp'
import styles from './CartProductList.module.css'
import CartItem from './Item/CartItem'

export default function CartProductList() {
    const { state } = useApp()

    return (
        <div className={styles.list}>
            {state.products.length ? state.cart.length && 
                state.cart.sort((a, b) => b.productId - a.productId).map(p => (
                    <CartItem key={`${p.productId}${p.sizeId}`} product={p} />
                ))
            : (
                <p>Cargando</p>
            )}
        </div>
    )
}
