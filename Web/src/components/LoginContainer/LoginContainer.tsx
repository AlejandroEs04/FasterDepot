import { ChangeEvent, useState } from 'react'
import Input from '../Input/Input'
import styles from './LoginContainer.module.css'

export default function LoginContainer() {
    const [loginForm, setLoginForm] = useState({
        email: '', 
        password: ''
    })

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
    
        setLoginForm({
            ...loginForm, 
            [name] : +value
        })
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h2 className='text-primary'>Iniciar Sesión</h2>
                <p>Ingresa tus credenciales para iniciar sesión</p>

                <div className='mt-1'>
                    <Input 
                        label='Email'
                        name='email'
                        value={loginForm.email}
                        placeholder='Ej. correo@fasterdepot.com'
                        fnc={handleChange}
                    />

                    <Input 
                        label='Password'
                        name='password'
                        value={loginForm.password}
                        placeholder='Ej. correo@fasterdepot.com'
                        fnc={handleChange}
                        className='mt-05'
                    />

                    <button className='mt-05 btn btn-primary w-full'>Iniciar Sesión</button>
                </div>

                <div className='mt-2'>
                    <p>¿Aún no tienes cuenta? <button className='text-primary'>Crear cuenta</button></p>
                    <p>¿Olvidaste tu contraseña? <button className='text-primary'>Recupera tu contraseña</button></p>
                </div>
            </div>
        </div>
    )
}
