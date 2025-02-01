import PurchaseCard from "../components/PurchaseCard/PurchaseCard"
import RequestEmail from "../components/RequestEmail/RequestEmail"
import { useApp } from "../hooks/useApp"

export default function Purchases() {
    const { state } = useApp()

    console.log(state.purchases)

    return (
        <>
            <div className="container mt-1">
                <h1>Ver mis compras</h1>

                <div>
                    {state.purchases.map(p => (
                        <PurchaseCard key={p.id} purchase={p} />
                        
                    ))}
                </div>
            </div>
            
            {state.purchases.length === 0 && <RequestEmail />}
        </>
    )
}
