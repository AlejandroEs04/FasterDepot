import { useEffect, useState } from 'react'
import { Cart, Product } from '../../../types'
import styles from '../CartProductList.module.css'
import { useApp } from '../../../hooks/useApp'
import { currencyFormat } from '../../../helpers'

export default function CartItem({ product } : { product: Cart }) {
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
    const { state, saveCart, dispatch } = useApp()

    useEffect(() => {
        if(state.products.length && product) {
            setCurrentProduct(state.products.filter(p => p.id === product.productId)[0])
        }
    }, [state.products])

    const handleChangeQuantity = (qty: number) => {
        saveCart({ ...product, quantity: product.quantity + qty }, true)
    }

    const handleDelete = () => {
        dispatch({ type: 'delete-cart', payload: { product } })
    }

    if(currentProduct) return (
        <div className={styles.item} key={`${product.productId}${product.sizeId}`}>
            <div className={styles.info}>
                <p className={styles.name}>{currentProduct.name}</p>
                <p className={styles.price}>{currencyFormat(currentProduct.price)}</p>

                <p className='mt-05'>Cantidad</p>

                <div className={`${styles.quantitySelect}`}>
                    <button onClick={() => handleChangeQuantity(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <div className={styles.qtyContainer}>
                        <div className={styles.quantity}>{product.quantity}</div>
                    </div>
                    <button onClick={() => handleChangeQuantity(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={`${styles.deleteButton} btn`} onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
