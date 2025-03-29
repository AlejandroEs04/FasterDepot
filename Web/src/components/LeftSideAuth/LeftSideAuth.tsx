import { Link } from "react-router-dom"

export default function LeftSideAuth() {
    return (
        <div className="form-container">
            <Link to={'/'} className="backLink">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

                Volver al inicio
            </Link>

            <h1 className="mt-1">Faster Depot</h1>

            <h2 className="mt-2">¡Contactanos!</h2>
            <ul className="comunication-list mt-05">
                <li>
                    <div className="flex">
                        <p>Whatsapp</p>
                        <Link to={''} className="text-light-gray">Haz click aqui</Link>
                    </div>
                </li>
                <li>
                    <div className="flex">
                        <p>Telefono</p>
                        <Link to={''} className="text-light-gray">8110367083</Link>
                    </div>
                </li>
                <li>
                    <div className="flex">
                        <p>Correo</p>
                        <Link to={''} className="text-light-gray">ventas.faster@gmail.com</Link>
                    </div>
                </li>
            </ul>

        </div>
    )
}
