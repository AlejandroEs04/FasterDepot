import { ChangeEvent, useState } from 'react'
import { currencyFormat } from '../../helpers'
import { Product } from '../../types'
import Input from '../Input/Input'
import styles from './ProductInfo.module.css'
import Select from '../Select/Select'
import { useApp } from '../../hooks/useApp'
import { toast } from 'react-toastify'

type ProductInfoProps = {
    product: Product
}

export default function ProductInfo({ product } : ProductInfoProps) {
    const { saveCart } = useApp()
    const [addCart, setAddCart] = useState({
        productId: product.id, 
        quantity: 1, 
        sizeId: null
    })

    const handleSaveCart = () => {
        if(product.sizes.length && !addCart.sizeId) {
            toast.error('Debe seleccionar una talla')
            return
        }

        saveCart(addCart)
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setAddCart({
            ...addCart, 
            [name] : +value
        })
    }

    const getOptions = () => {
        return product.sizes.map(o => {
            return {
                value: o.sizeId!, 
                label: o.size?.name!
            }
        })
    }

    return (
        <div className={styles.container}>
            {product.imageUrl && (
                <div className={styles.imageContainer}>
                    <img src={product.imageUrl} alt={`${product.name} image`} />
                </div>
            )}

            <div className={styles.infoContainer}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                
                <p className={`${styles.priceLabel} mt-1`}>Precio:</p>
                <p className={styles.price}>{currencyFormat(product.price)} mxn</p>

                <div className={`${styles.form} mt-1`}>
                    {product.sizes.length > 0 && (
                        <Select 
                            label='Seleccione una talla'
                            value={addCart.sizeId}
                            name='sizeId'
                            fnc={handleChange}
                            options={getOptions()}
                            placeHolder='Seleccione una talla'
                        />
                    )}
                    <Input 
                        type='number'
                        label='Cantidad'
                        value={addCart.quantity}
                        name='quantity'
                        fnc={handleChange}
                        className='mt-05'
                    />

                    <button onClick={handleSaveCart} className='btn btn-primary w-full center-div gap-1 mt-05'>
                        <p className='text-lg'>Add Cart</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
