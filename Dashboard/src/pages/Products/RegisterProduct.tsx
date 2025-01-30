import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import styles from './Products.module.css'
import { useApp } from "../../hooks/useApp"
import { ProductRegister } from "../../types"
import { uploadProductImage } from "../../api/uploader";
import { registerProducts } from "../../api/products";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterProduct() {
    const [newProduct, setNewProduct] = useState<ProductRegister>({
        name: '', 
        price: 0, 
        wholesalePrice: 0, 
        description: '', 
        image: null, 
        imageUrl: ''
    });
    const [previewImage, setPreviewImage] = useState('')

    const navigate = useNavigate()

    const { dispatch } = useApp()

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        const isNumber = ['price', 'wholesalePrice'].includes(name)

        setNewProduct({
            ...newProduct, 
            [name] : isNumber ? +value : value
        })
    }

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewProduct({ ...newProduct, image: e.target.files[0] });

            const imageUrl = URL.createObjectURL(e.target.files[0])
            setPreviewImage(imageUrl)
        }
    }

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        try {
            if(newProduct.image) {
                const imageUrl = await uploadProductImage(newProduct.image)
                newProduct.imageUrl = imageUrl
                
                const response = await registerProducts(newProduct)
                toast.success(response)

                navigate('/products')
            }
        } catch (error) {
            console.log(error)
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

    return (
        <div className="container">
            <h1>Registrar producto</h1>

            <form onSubmit={handleSubmit} className={`info-container`}>
                <h2>Información del producto</h2>
                <div className={`${styles.grid2}`}>
                    <div className={`mt`}>
                        <div className="input-container">
                            <label htmlFor="name">Nombre</label>
                            <input onChange={handleChange} value={newProduct.name} type="text" id="name" name="name" placeholder="Nombre del producto" />
                        </div>

                        <div className={`${styles.grid2}`}>
                            <div className="input-container">
                                <label htmlFor="price">Precio</label>
                                <input value={newProduct.price} onChange={handleChange} name="price" type="number" id="price" placeholder="Precio" />
                            </div>

                            <div className="input-container">
                                <label htmlFor="wholesalePrice">Precio a mayoreo</label>
                                <input value={newProduct.wholesalePrice} onChange={handleChange} name="wholesalePrice" type="number" id="wholesalePrice" placeholder="Price a mayoreo" />
                            </div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={handleChange} name="description" id="description"></textarea>
                        </div>
                    </div>

                    <div>
                        <div className="input-container">
                            <label htmlFor="image">Imagen</label>
                            <input type="file" onChange={handleChangeFile} name="image" id="image" />
                        </div>

                        {newProduct.image && (
                            <img src={previewImage} className={styles.imagePreview} />
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt">Registrar Producto</button>
            </form> 
        </div>
    )
}
