import { Link } from "react-router-dom";

export default function Deliveries() {
    return (
        <div className='container'>
            <h1>Entregas pendientes</h1>

            <div className={`indexNav`}>
                <Link to={'/buy/deliveries'}>Entregas pendientes</Link>
                <Link to={'/settings'}>Reporte de ventas</Link>
            </div>
        </div>
    )
}
