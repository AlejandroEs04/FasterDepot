import { Link } from 'react-router-dom'

export default function Porfile() {
    return (
        <div className='container'>
            <h1>Perfil</h1>

            <h3 className='text-center font-bold'>Usted no ha iniciado sesión</h3>

            <div className='mt-1'>
                <Link to={'/porfile/purchases'} className='btn btn-primary'>Ver compras</Link>
            </div>
        </div>
    )
}
