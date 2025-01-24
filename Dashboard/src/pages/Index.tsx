import { useEffect } from 'react'
import { useApp } from '../hooks/useApp'
import styles from './Index.module.css'
import { Link } from 'react-router-dom'

export default function Index() {
    const { dispatch } = useApp()
    
    useEffect(() => {
        dispatch({ type: 'change-routes', payload: { routes: [{ name: 'Overview', url: '/' }] } })
    }, [])

    return (
        <div className='container'>
            <h1>Account</h1>

            <div className={`${styles.indexNav}`}>
                <Link to={'/'}>Overview</Link>
                <Link to={'/'}>Settings</Link>
                <Link to={'/'}>Security</Link>
                <Link to={'/'}>Charts</Link>
            </div>

            <div className='info-container'>
                <div className='justify-between'>
                    <h3>Movements</h3>
                    
                    <button className='btn btn-primary'>
                        See more
                    </button>
                </div>

                <div className={`${styles.listMovements}`}>
                    <div className={`${styles.item}`}>
                        <p>Sales</p>
                        <p className={`${styles.number}`}>10 sales</p>
                    </div>
                    <div className={`${styles.item}`}>
                        <p>Products</p>
                        <p className={`${styles.number}`}>40 products</p>
                    </div>
                    <div className={`${styles.item}`}>
                        <p>Totals</p>
                        <p className={`${styles.number}`}>$1500.00 mxn</p>
                    </div>
                </div>

                <p className='down-text'>Last 30 day sales calculated</p>
            </div>
        </div>
    )
}
