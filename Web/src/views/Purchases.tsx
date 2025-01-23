import RequestEmail from "../components/RequestEmail/RequestEmail"
import { currencyFormat } from "../helpers"
import { useApp } from "../hooks/useApp"

const statusDictionary : {[key: string] : string} = {
    RECEIVED: 'Recibido',
    ONTHEWAY: 'En camino',
    DELIVERED: 'Entregado',
}

export default function Purchases() {
    const { state } = useApp()

    console.log(state.purchases)

    return (
        <>
            <div className="container mt-1">
                <h1>Ver mis compras</h1>

                <div>
                    {state.purchases.map(p => (
                        <div key={p.id} className="content">
                            <p>{new Date(p.date).toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
                            <p>{currencyFormat(p.amount)}</p>
                            <p>{statusDictionary[p.status]}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {state.purchases.length === 0 && <RequestEmail />}
        </>
    )
}
