import { Link, useNavigate } from "react-router-dom"
import { currencyFormat } from "../../helpers"
import { Product } from "../../types"
import styles from './ItemContainer.module.css'
import { useApp } from "../../hooks/useApp"
import { useState } from "react"

type ItemContainer = {
    item: Product
    typeContainer?: boolean
}

export default function ItemContainer({ item, typeContainer = false } : ItemContainer) {
    const [product, setProduct] = useState({
        productId: item.id, 
        quantity: 1, 
        sizeId: null
    })
    const { saveCart } = useApp()
    const navigate = useNavigate()

    const handleSaveCart = () => {
        if(item.sizes.length) {
            navigate(`/products/${item.id}`)
            return
        }
        saveCart(product)
    }

    const handlePlus = () => setProduct({ ...product, quantity: product.quantity + 1 })
    const handleMinus = () => {
        if(product.quantity > 1) setProduct({ ...product, quantity: product.quantity - 1 })
    }

    return (
        <div className={`${styles.container} ${!typeContainer && styles.width}`}>
            <div className={styles.imageContainer}>
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={`${item.name} image`} />
                ) : (
                    <div className={styles.textContainer}>
                        <p className={styles.noAvaibleText}>Imagen no disponible</p>
                    </div>
                )}
            </div>

            <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.price}>{currencyFormat(item.price)}</p>
            </div>

            <div className={styles.buttonContainer}>
                <Link to={`/products/${item.id}`} className="btn btn-primary w-full text-center">Saber más</Link>

                <div className={styles.addCart}>
                    {item.sizes.length === 0 && (
                        <div className={styles.selectNumber}>
                            <button onClick={handleMinus}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>

                            <div>
                                <p className={styles.quantityContainer}>{product.quantity}</p>
                            </div>

                            <button onClick={handlePlus}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </div>
                    )}

                    <button 
                        onClick={handleSaveCart} 
                        className="btn btn-secondary w-full center-div"
                    >
                        {item.sizes.length ? 'Agregar al carrito' : (
                            <div className={styles.selectAdd}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                
                                <p>Agregar</p>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
