import { useEffect, useMemo, useState } from "react";
import api from "../lib/axios";
import { useApp } from "../hooks/useApp";
import CheckoutList from "../components/CheckoutList/CheckoutList";
import { currencyFormat, getTotal } from "../helpers";
import { Link, useNavigate } from "react-router-dom";
import { Cart } from "../types";
import { registerBuy } from "../api/buy";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function ConfirmCheckout() {
    const [paid, setPaid] = useState<Boolean | null>(null) 
    const [loading, setLoading] = useState(false) 
    const [products, setProducts] = useState<Cart[]>([])

    const { state, dispatch } = useApp()
    const navigate = useNavigate()

    async function verifyPayment(sessionId: string) {
        const response = await api(`/checkoutStripe/verify-payment?session_id=${sessionId}`);
        return response.data;
    }

    const checkoutSuccess = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
      
        if (sessionId) {
            const paymentInfo = await verifyPayment(sessionId);

            if(paymentInfo.status == 'paid') {
                setLoading(true)

                try {
                    const response = await registerBuy(sessionId, state.cart, state.address, paymentInfo.email)
                    setPaid(true)

                    if(response?.cart) setProducts(response?.cart)

                    dispatch({ type: 'reset-cart' })
                } catch (error) {
                    console.log(error)

                    navigate('/')
                } finally {
                    setLoading(false)
                }
            }
        }
    }

    const subtotal = useMemo(() => products.reduce((total, product) => total + getTotal(product.productId, product.quantity, state.products), 0), [state.cart, state.products])

    useEffect(() => {
        checkoutSuccess();
    }, [])

    if(loading) return <LoadingSpinner />

    return (
        <div className="container">
            <h1>Checkout</h1>
            <p className="alert alert-success">{paid && 'Se ha realizado la compra con éxito'}</p>

            <div className="summary-view mt-1">
                <div className="summary-info">
                    <div className="content">
                        <h3>Información de la compra</h3>
                    
                        <div className="mt-1">
                            <CheckoutList products={products} />
                        </div>
                    </div>
                </div>

                <div className="summary-info paysection">
                    <div className="content">
                        <h2>Resumen de la compra</h2>
                        <p className="price">Total: <span>{currencyFormat(subtotal)} mxn</span></p>

                        <div className="mt-1">
                            <Link to={'/'} className="btn btn-primary w-full">Regresar al inicio</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
