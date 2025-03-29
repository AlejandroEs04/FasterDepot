import { Link } from "react-router-dom"
import LeftSideAuth from "../components/LeftSideAuth/LeftSideAuth"

export default function Login() {
    return (
        <div className="unique-form">
            <div className="side-container bg-gray">
                <LeftSideAuth />
            </div>

            <div className="bg-white side-container">
                <div className="form-container shadow">
                    <div>
                        <form>
                            <h1>Iniciar Sesión</h1>
                            <p>Ingresa tus credenciales para iniciar sesión</p>

                            <div className="input-group mt-1">
                                <label htmlFor="loginUser">Correo / Número de celular</label>
                                <input type="text" placeholder="Correo / Número de celular" />
                            </div>

                            <div className="input-group mt-05">
                                <label htmlFor="loginUser">Contraseña</label>
                                <input type="password" placeholder="Contraseña" />
                            </div>
                            
                            <input type="submit" value="Iniciar Sesión" className="mt-1 w-full btn btn-primary" />
                        </form>

                        <p className="mt-2 text-gray">¿Aún no tienes cuenta? <Link to={'/signup'} className="text-primary">Crear cuenta</Link></p>
                        <p className="text-gray">¿Olvidaste tu contraseña? <Link to={'/recovery-password'} className="text-primary">Recuperar cuenta</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
