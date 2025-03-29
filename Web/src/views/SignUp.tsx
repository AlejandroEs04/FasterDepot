import { Link } from "react-router-dom"
import LeftSideAuth from "../components/LeftSideAuth/LeftSideAuth"
import { ChangeEvent, useState } from "react"
import { User } from "../types"

export default function SignUp() {
    const [user, setUser] = useState<User>({
        name: '', 
        lastName: '', 
        email: '', 
        number: '', 
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUser({
            ...user, 
            [name] : value
        })
    }

    return (
        <div className="unique-form">
            <div className="side-container bg-gray">
                <LeftSideAuth />
            </div>

            <div className="bg-white side-container">
                <div className="form-container shadow">
                    <div>
                        <form>
                            <h1>Crear Cuenta</h1>
                            <p>Ingresa tus credenciales para crear una nueva cuenta</p>

                            <div className="input-group mt-1">
                                <label htmlFor="name">Nombre(s)</label>
                                <input name="name" onChange={handleChange} value={user.name} type="text" id="name" placeholder="Nombre(s)" />
                            </div>
                            
                            <div className="input-group mt-05">
                                <label htmlFor="lastNamme">Apellido(s)</label>
                                <input name="lastName" onChange={handleChange} value={user.lastName} type="text" id="lastNamme" placeholder="Apellido(s)" />
                            </div>

                            <div className="input-group mt-2">
                                <label htmlFor="email">Correo</label>
                                <input name="email" onChange={handleChange} value={user.email} type="email" id="email" placeholder="Correo" />
                            </div>
                            
                            <div className="input-group mt-05">
                                <label htmlFor="phonerNumber">Número de celular</label>
                                <input name="number" onChange={handleChange} value={user.number} type="number" id="phonerNumber" placeholder="Número de celular" />
                            </div>

                            <div className="input-group mt-05">
                                <label htmlFor="password">Contraseña</label>
                                <input name="password" onChange={handleChange} value={user.password} type="password" id="password" placeholder="Contraseña" />
                            </div>
                            
                            <input type="submit" value="Iniciar Sesión" className="mt-1 w-full btn btn-primary" />
                        </form>

                        <p className="mt-2 text-gray">¿Ya tienes cuenta? <Link to={'/login'} className="text-primary">Iniciar Sesión</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
