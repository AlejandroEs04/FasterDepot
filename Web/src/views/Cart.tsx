import ItemsList from '../components/ItemList/ItemsList'
import CartProductList from '../components/CartProductList/CartProductList'
import { useApp } from '../hooks/useApp'
import { useMemo } from 'react'
import { currencyFormat } from '../helpers'
import { Link } from 'react-router-dom'

export default function Cart() {
    const { state } = useApp()
    
    console.log(state.cart)    

    const getTotal = (id: number, qty: number) => {
        if(state.products.length === 0) return 0

        let total = 0
        const product = state.products.filter(p => p.id === id)[0]
            
        if(product.wholesalePrice) {
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

    const qtyProducts = useMemo(() => state.cart.reduce((total, product) => total + product.quantity, 0), [state.cart])
    const subtotal = useMemo(() => state.cart.reduce((total, product) => total + getTotal(product.productId, product.quantity), 0), [state.cart])

    if(state.products.length === 0) return <p>Cargando</p>

    return (
        <div className='container'>
            <h1>Carrito</h1>

            {state.cart.length ? (
                <div className='summary-view'>
                    <div className='summary-info'>
                        <CartProductList />
                    </div>
                    
                    <div className='summary-info paysection'>
                        <div className='content flex-col'>
                            <p className='price'>Subtotal: <span>{currencyFormat(subtotal)}</span></p>
                            <p>Productos: <span>{qtyProducts} producto{qtyProducts > 1 && 's'}</span></p>

                            <Link className='btn btn-primary w-full text-center mt-05' to={'/checkout'}>Comprar</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='alert-message'>
                        <p>No hay productos en el carrito aún:c</p>

                        <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </div>
                    </div>


                    <div className='mt-05'>
                        <Link className='btn btn-primary mt-1' to={'/products'}>Ver productos</Link>
                    </div>
                </div>
            )}


            <div className='mt-2'>
                <h2>Productos que te pueden interesar</h2>
                <ItemsList />
            </div>
        </div>
    )
}
