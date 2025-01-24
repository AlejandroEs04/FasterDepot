import { Link } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { useEffect, useState } from "react";
import { Product } from "../../types";
import { getProducts } from "../../api/products";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const { dispatch } = useApp()

    const productsRequest = async() => setProducts(await getProducts())

    useEffect(() => {
        dispatch({ type: 'change-routes', payload: { routes: [{ name: 'Products', url: '/products' }] } })
        productsRequest()
    }, [])
    
    return (
        <div className="container">
            <h1>Productos</h1>

            <div className='info-container'>
                <div className='justify-between'>
                    <h2>Inventario</h2>
                    
                    <Link to={'/products/add'} className='btn btn-primary'>
                        Registrar Producto
                    </Link>
                </div>

                {products.length ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <p>No hay productos registrados</p>
                    </div>
                )}
            </div>
        </div>
    )
}
