import { Link } from 'react-router-dom'

export default function Porfile() {
    return (
        <div className='container'>
            <h1>Perfil</h1>

            <div>
                <h3 className='text-center font-bold'>Usted no ha iniciado sesión</h3>
                <div className='text-center'>
                    <Link className='text-gray text-center' to={'/login'}>Iniciar sesión</Link>
                </div>
            </div>

            <div className='mt-1'>
                <Link to={'/porfile/purchases'} className='btn btn-primary'>Ver compras</Link>
            </div>
        </div>
    )
}
