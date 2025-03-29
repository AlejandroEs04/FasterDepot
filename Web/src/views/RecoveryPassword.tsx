import { Link } from "react-router-dom"
import LeftSideAuth from "../components/LeftSideAuth/LeftSideAuth"

export default function RecoveryPassword() {
    return (
        <div className="unique-form">
            <div className="side-container bg-gray">
                <LeftSideAuth />
            </div>

            <div className="bg-white side-container">
                <div className="form-container shadow">
                    <div>
                        <form>
                            <h1>Recuperar contraseña</h1>
                            <p>Ingresa tu correo para recuperar tu contraseña</p>

                            <div className="input-group mt-1">
                                <label htmlFor="email">Correo</label>
                                <input type="email" id="email" placeholder="Correo" />
                            </div>
                            
                            <input type="submit" value="Iniciar Sesión" className="mt-1 w-full btn btn-primary" />
                        </form>

                        <p className="mt-2 text-gray">¿Ya tienes cuenta? <Link to={'/login'} className="text-primary">Iniciar Sesión</Link></p>
                        <p className="text-gray">¿Aún no tienes cuenta? <Link to={'/signup'} className="text-primary">Crear cuenta</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
