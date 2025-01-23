import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { Product as ProductType } from '../types'
import ItemsList from '../components/ItemList/ItemsList'
import ProductInfo from '../components/ProductInfo/ProductInfo'

export default function Product() {
    const [product, setProduct] = useState<ProductType | null>(null)
    const { id } = useParams()
    const { state } = useApp()

    useEffect(() => {
        if(state.products.length && id) setProduct(state.products.filter(p => p.id === +id)[0])
    }, [state.products, id])

    if(product) return (
        <div className='container mt-1'>
            <ProductInfo product={product} />

            <div className='mt-2'>
                <h2>Otros productos</h2>
                <ItemsList limit={8} />
            </div>
        </div>
    )
}
