import { currencyFormat, getTotal } from '../../helpers'
import { useApp } from '../../hooks/useApp'
import { Buy } from '../../types'
import styles from './PurchaseCard.module.css'

type PurchaseCardProps = {
    purchase: Buy
}

const statusDictionary : {[key: string] : string} = {
    RECEIVED: 'Recibido',
    ONTHEWAY: 'En camino',
    DELIVERED: 'Entregado',
}

export default function PurchaseCard({ purchase } : PurchaseCardProps) {
    const { state } = useApp()

    return (
        <div className={styles.purchaseCard}>
            <p>{new Date(purchase.date).toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
            <p className={styles.price}>{currencyFormat(purchase.amount)}</p>
            <p>Status: <span className={`font-bold`}>{statusDictionary[purchase.status]}</span></p>

            <table className='mt-1'>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {purchase.productBuy.map(p => (
                        <tr key={`${p.buyId}-${p.productId}`}>
                            <td>{state.products.filter(product => product.id === p.productId)[0].name}</td>  
                            <td>{currencyFormat(p.pricePerUnit)}</td>  
                            <td>{p.quantity}</td>  
                            <td>{currencyFormat(getTotal(p.productId, p.quantity, state.products))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
