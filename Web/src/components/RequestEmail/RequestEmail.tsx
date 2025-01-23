import { ChangeEvent, useState } from 'react'
import styles from './RequestEmail.module.css'
import Input from '../Input/Input'
import { getPayerBuy } from '../../api/buy'
import { useApp } from '../../hooks/useApp'
import { Link } from 'react-router-dom'

export default function RequestEmail() {
    const [email, setEmail] = useState('')
    const { dispatch, state } = useApp()

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

    const handleSubmit = async() => {
        try {
            const purchases = await getPayerBuy(email)
            
            if(purchases.length > 0) {
                dispatch({ type: 'set-purchases', payload: { purchases } })
                dispatch({ type: 'set-alert', payload: { alert: null } })
            } else {
                dispatch({ type: 'set-alert', payload: { alert: { isError: true, msg: 'No tienes ninguna compra' } } })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h2 className='text-primary'>Obtener compras</h2>
                <p>Ingresa tus credenciales para ver las compras que has hecho</p>

                {state.alert && (
                    <>
                        <p className="alert alert-danger mt-05">{state.alert.msg}</p>

                        <div className='center-div'>
                            <Link to={'/'} className='text-primary w-full text-center mt-05'>Volver al inicio</Link>
                        </div>
                    </>
                )}

                <div className='mt-05'>
                    <Input 
                        label='Email'
                        name='email'
                        value={email}
                        placeholder='Ej. correo@fasterdepot.com'
                        fnc={handleChange}
                    />

                    <button onClick={handleSubmit} className='mt-05 btn btn-primary w-full'>Obtener compras</button>
                </div>
            </div>
        </div>
    )
}
