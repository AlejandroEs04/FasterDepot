import { ChangeEvent, useEffect, useState } from "react"
import { useApp } from "../../hooks/useApp"
import { useParams } from "react-router-dom"
import { Product } from "../../types"
import styles from './Products.module.css'

export default function EditProduct() {
    const [product, setProduct] = useState<Product | null>(null)
    const [previewImage, setPreviewImage] = useState('')
    const { dispatch, state } = useApp()
    const { id } = useParams()

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
    
        const isNumber = ['price', 'wholesalePrice'].includes(name)
    
        setProduct({
            ...product!, 
            [name] : isNumber ? +value : value
        })
    }
    
    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProduct({ ...product!, image: e.target.files[0] });
    
            const imageUrl = URL.createObjectURL(e.target.files[0])
            setPreviewImage(imageUrl)
        }
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

    useEffect(() => {
        if(state.products.length && id) {
            setProduct(state.products.filter(p => p.id === +id)[0])
        }
    }, [id, state.products])

    return (
        <div className="container">
            <h1>Editar producto</h1>

            {product && (

                <form className={`info-container`}>
                    <h2>Información del producto</h2>
                    <div className={`${styles.grid2}`}>
                        <div className={`mt`}>
                            <div className="input-container">
                                <label htmlFor="name">Nombre</label>
                                <input onChange={handleChange} value={product.name} type="text" id="name" name="name" placeholder="Nombre del producto" />
                            </div>

                            <div className={`${styles.grid2}`}>
                                <div className="input-container">
                                    <label htmlFor="price">Precio</label>
                                    <input value={product.price} onChange={handleChange} name="price" type="number" id="price" placeholder="Precio" />
                                </div>

                                <div className="input-container">
                                    <label htmlFor="wholesalePrice">Precio a mayoreo</label>
                                    <input value={product.wholesalePrice} onChange={handleChange} name="wholesalePrice" type="number" id="wholesalePrice" placeholder="Price a mayoreo" />
                                </div>
                            </div>

                            <div className="input-container">
                                <label htmlFor="description">Description</label>
                                <textarea onChange={handleChange} value={product.description} name="description" id="description"></textarea>
                            </div>
                        </div>

                        <div>
                            <div className="input-container">
                                <label htmlFor="image">Imagen</label>
                                <input type="file" onChange={handleChangeFile} name="image" id="image" />
                            </div>

                            {product.image && (
                                <img src={previewImage} className={styles.imagePreview} />
                            )}
                        </div>
                    </div>
                    
                    <div className="flex mt">
                        <button type="submit" className="btn btn-primary">Editar Producto</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                    </div>
                </form> 
            )}
        </div>
    )
}
