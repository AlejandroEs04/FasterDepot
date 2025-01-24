import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './LoginModal.module.css'
import { authLogin, login } from '../../api/login'
import { useApp } from '../../hooks/useApp'

export default function LoginModal() {
    const { dispatch, state, setLoading } = useApp()
    const [loginCredentials, setLoginCredentials] = useState({
        email: '', 
        password: ''
    })

    const handleSubmit = async(e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        
        try {
            const token = await login(loginCredentials)
            localStorage.setItem('token', token)
            
            dispatch({ 
                type: 'set-alert', 
                payload: { alert: null } 
            });

            const auth = await authLogin(token)
            dispatch({ type: 'set-auth', payload: { auth } })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            dispatch({ 
                type: 'set-alert', 
                payload: { alert: { isError: true, msg: errorMessage } } 
            });
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginCredentials({
            ...loginCredentials, 
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={`${styles.loginContainer}`}>
            <form onSubmit={handleSubmit} className={`${styles.loginForm}`}>
                <h1>Sign in</h1>
                <p>Please fill your credentials for login</p>

                {state.alert && (
                    <p className={`alert ${state.alert.isError ? 'error' : 'success'}`}>{state.alert.msg}</p>
                )}

                <div className="input-container mt">
                    <label htmlFor="email">Email</label>
                    <input value={loginCredentials.email} onChange={handleChange} name='email' type="text" id="email" placeholder="Email" />
                </div>
                <div className="input-container mt">
                    <label htmlFor="password">Password</label>
                    <input value={loginCredentials.password} onChange={handleChange} type="password" id="password" name='password' placeholder="Password" />
                </div>

                <button className='btn btn-primary btn-lg w-full mt'>Login</button>
            </form>
        </div>
    )
}
