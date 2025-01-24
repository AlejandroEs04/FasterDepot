import { ChangeEvent, useEffect, useState } from "react"
import styles from './Products.module.css'
import { useApp } from "../../hooks/useApp";

export default function RegisterProduct() {
    const [newProduct, setNewProduct] = useState({
        name: '', 
        price: 0, 
        wholesalePrice: 0, 
        description: ''
    });

    const { dispatch } = useApp()

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const isNumber = ['price', 'wholesalePrice'].includes(name)

        setNewProduct({
            ...newProduct, 
            [name] : isNumber ? +value : value
        })
    }

    useEffect(() => {
        dispatch({ 
            type: 'change-routes', 
            payload: { 
                routes: [
                    { name: 'Productos', url: '/products' },
                    { name: 'Registrar Producto', url: '/products/add' }
                ] 
            } 
        })
    }, [])

    return (
        <div className="container">
            <h1>Registrar producto</h1>

            <form className={`info-container`}>
                <h2>Información del producto</h2>
                <div className={`${styles.grid2} mt`}>
                    <div className="input-container">
                        <label htmlFor="name">Nombre</label>
                        <input onChange={handleChange} value={newProduct.name} type="text" id="name" name="name" placeholder="Nombre del producto" />
                    </div>

                    <div className={`${styles.grid2}`}>
                        <div className="input-container">
                            <label htmlFor="price">Precio</label>
                            <input value={newProduct.price} type="number" id="price" placeholder="Precio" />
                        </div>

                        <div className="input-container">
                            <label htmlFor="wholesalePrice">Precio a mayoreo</label>
                            <input value={newProduct.wholesalePrice} type="number" id="wholesalePrice" placeholder="Price a mayoreo" />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description"></textarea>
                    </div>
                </div>



                <button className="btn btn-primary mt">Registrar Producto</button>
            </form>
        </div>
    )
}
