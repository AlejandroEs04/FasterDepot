
import CheckoutList from "../components/CheckoutList/CheckoutList";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useApp } from "../hooks/useApp";
import { currencyFormat, getTotal } from "../helpers";
import Input from "../components/Input/Input";
import { Address } from "../types";
import ItemsList from "../components/ItemList/ItemsList";
import { createCheckoutSession } from "../api/checkout";

export default function Checkout() {
    const { state, dispatch } = useApp()
    const [useAddress, setUseAddress] = useState(true)
    const [address, setAddress] = useState<Address>(state.address)

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
    
        setAddress({
            ...address, 
            [name] : value
        })
    }

    const subtotal = useMemo(() => state.cart.reduce((total, product) => total + getTotal(product.productId, product.quantity, state.products), 0), [state.cart, state.products])

    const isIncomplete = useMemo(() => {
        return state.address.address === '' ||
            state.address.postalCode === '' ||  
            state.address.city === '' ||  
            state.address.state === '' ||  
            state.address.country === ''
    }, [state.address, useAddress])

    useEffect(() => {
        dispatch({ type: 'update-address', payload: { address } })
    }, [address])

    if(state.products.length === 0) return <p>Cargando</p>

    const checkout = async () => {
        try {
            const sessionUrl = await createCheckoutSession(state.cart);
            if (sessionUrl) {
                window.location.href = sessionUrl;
            }
        } catch (error) {
            console.log(error);
        }
      };

    return (
        <div className="container">
            <h1>Checkout</h1>

            <div className="summary-view">
                <div className="summary-info">
                    <div className="content">
                        <h3>Información de la compra</h3>

                        <div className="mt-1">
                            <CheckoutList />
                        </div>
                    </div>
                    
                    <div className="content">
                        <h3>Dirección de entrega</h3>

                        <div className="checkbox-input">
                            <input 
                                checked={useAddress} 
                                type="checkbox" 
                                onChange={(e) => {
                                    setUseAddress(e.target.checked)
                                }} 
                            />
                            <label htmlFor="">Ingresar mi dirección</label>
                        </div>
                        
                        {useAddress && (
                            <div className="mt-1">
                                <Input 
                                    placeholder="Dirección"
                                    name="address"
                                    fnc={handleChange}
                                    label="Dirección"
                                    value={address.address}
                                />
                                
                                <div className="grid-2 mt-05">
                                    <Input 
                                        placeholder="Código Postal"
                                        name="postalCode"
                                        fnc={handleChange}
                                        label="Código Postal"
                                        value={address.postalCode}
                                    />
                                    <Input 
                                        placeholder="Ciudad"
                                        name="city"
                                        fnc={handleChange}
                                        label="Ciudad"
                                        value={address.city}
                                    />
                                    <Input 
                                        placeholder="Estado"
                                        name="state"
                                        fnc={handleChange}
                                        label="Estado"
                                        value={address.state}
                                    />
                                    <Input 
                                        placeholder="País"
                                        name="country"
                                        fnc={handleChange}
                                        label="País"
                                        value={address.country}
                                    />
                                </div>
                                
                            </div>
                        )}
                    </div>
                </div>

                <div className="summary-info paysection">
                    <div className="content">
                        <h2>Finalizar compra</h2>

                        <p className="price">Total: <span>{currencyFormat(subtotal)} mxn</span></p>

                        {!useAddress && (
                            <p className="mt-05">La dirección de entrega estara ligada a su metodo de pago</p>
                        )}

                        <div className="mt-1">
                            {isIncomplete ? (
                                <div>
                                    <p className="alert alert-danger">Debe ingresar una dirección</p>
                                </div>
                            ) : (
                                <>
                                    <button onClick={checkout} className="btn btn-primary w-full">Finalizar compra</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-2'>
                <h2>Productos que te pueden interesar</h2>
                <ItemsList />
            </div>
        </div>
    )
}
