import { Link } from 'react-router-dom'

export default function Support() {
    return (
        <div className='container'>
            <h1>Soporte técnico</h1>

            <div className={`indexNav`}>
                <Link to={'/support'}>Reportes de usuarios</Link>
                <Link to={'/'}>Soporte</Link>
            </div>
        </div>
    )
}
