import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation/Navigation'
import LoginModal from '../components/LoginModal/LoginModal'
import { useApp } from '../hooks/useApp'

export default function Layout() {
    const { state, loading } = useApp();

    return (
        <>
            <div className='main-2'>
                <nav className='main-nav'>
                    <Navigation />
                </nav>

                <main>
                    <Header />
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
        </>
    )
}
