import { Link } from 'react-router-dom'

export default function Porfile() {
    return (
        <div className='container'>
            <h1>Perfil</h1>

            <div>
                <Link to={'/porfile/purchases'}>Ver compras</Link>
            </div>
        </div>
    )
}
