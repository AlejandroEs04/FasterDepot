import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation/Navigation'
import LoginModal from '../components/LoginModal/LoginModal'
import { useApp } from '../hooks/useApp'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'

export default function Layout() {
    const { state, loading } = useApp();
    const [showNavigate, setShowNavigate] = useState(false)

    const handleToggleNav = () => setShowNavigate(!showNavigate)

    return (
        <>
            <div className='main-2'>
                <nav className={`${showNavigate && 'active'} main-nav`}>
                    <Navigation />
                </nav>

                <main>
                    <Header handleToggleNav={handleToggleNav} />
                    <Outlet />
                </main>
            </div>

            {loading && (
                <div className='absoluteCenter'>
                    <div className='loader-container'>
                        <span className="loader"></span>
                    </div>
                </div>
            )}
            
            {(!state.auth && !loading) && (
                <LoginModal />
            )}

           <ToastContainer /> 
        </>
    )
}
