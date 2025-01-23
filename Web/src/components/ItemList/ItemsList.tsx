import { useEffect, useState } from 'react'
import { useApp } from '../../hooks/useApp'
import ItemContainer from '../ItemContainer/ItemContainer'
import styles from './ItemsList.module.css'
import { Product } from '../../types'

type ItemListProps = {
    limit?: number | null
    itemList?: Product[]
    type?: 'scroll' | 'view'
    className?: string
    noWrap?: boolean
}

export default function ItemsList({ limit = null, itemList = [], type = 'scroll', className, noWrap = false } : ItemListProps) {
    const [items, setItems] = useState<Product[]>(itemList)
    const { state } = useApp()

    useEffect(() => {
        if(state.products.length) {
            setItems(state.products)
        }
    }, [state.products])

    if(items.length) return (
        <div className={`${styles.listContainer} ${className}`}>
            <div className={`${styles.list} ${type === 'scroll' ? styles.scroll : styles.view} ${noWrap && styles.noWrap}`}>
                {items.slice(0, limit ? limit : items.length).map(product => (
                    <ItemContainer typeContainer={type === 'view'} key={product.id} item={product} />
                ))}
            </div>
        </div>
    )
}
