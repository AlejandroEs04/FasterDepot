import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { useApp } from '../hooks/useApp';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Product } from '../types';

export default function Layout() {
    const [showSearch, setShowSearch] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const [productsFiltered, setProductsFiltered] = useState<Product[]>([])
    const { state } = useApp()

    const navigate = useNavigate()

    const handleScroll = () => setShowSearch(false)
    const handleToggleNav = () => setShowNav(!showNav)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setProductsFiltered(state.products)
    }, [state.products])

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setProductsFiltered(state.products.filter(p => p.name.includes(e.target.value)))
    }

    const handleEnter = (e : any) => {
        const keyCode = e.keyCode;

        if (keyCode === 13) 
            setShowSearch(false)
            navigate('/products')
    }

    const qtyProducts = useMemo(() => state.cart.reduce((total, product) => total + product.quantity, 0), [state.cart])

    return (
        <>
            <div className={`navside ${showNav && 'active'}`}>
                <div className='top-nav'>
                    <button onClick={handleToggleNav}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h3>Faster Depot</h3>

                <nav className='navigation'>
                    <Link onClick={handleToggleNav} to={'/'}>Inicio</Link>
                    <Link onClick={handleToggleNav} to={'/products'}>Productos</Link>
                    <Link onClick={handleToggleNav} to={'/porfile'}>
                        Perfil
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </Link>
                    <Link onClick={handleToggleNav} className='container-point' to={'/cart'}>
                        Carrito
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        
                        {qtyProducts > 0 && (
                            <div className='number-point'><p>{qtyProducts}</p></div>
                        )}
                    </Link>
                </nav>
            </div>
            <header className='header'>
                <div className='container navbar'>
                    <Link to={'/'} className='logo-container hidden-min'>
                        <img src="/Logo.png" alt="Logo Faster Depot" />
                    </Link>

                    <div 
                        className='search-container'
                    >
                        <input onChange={handleFilter} onKeyDown={handleEnter} onClick={() => setShowSearch(true)} type='search' placeholder='Buscar Producto' className='search-bar' />

                        <div className={`search-results ${showSearch && 'show-search-bar'}`}>
                            {productsFiltered.map(p => (
                                <Link key={p.id} onClick={() => setShowSearch(false)} to={`/products/${p.id}`}>{p.name}</Link>
                            ))}
                        </div>
                        
                    </div>

                    <nav className='navigation'>
                        <Link to={'/'} className='hidden-min'>Inicio</Link>
                        
                        <Link to={'/products'} className='hidden-min'>Productos</Link>
                        <Link to={'/porfile'} className='hidden-min'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </Link>
                        <Link to={'/'} className='hidden-max'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                        <Link className='container-point' to={'/cart'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            
                            {qtyProducts > 0 && (
                                <div className='number-point'><p>{qtyProducts}</p></div>
                            )}
                        </Link>

                        <button className='hidden-max' onClick={handleToggleNav}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </header>
            
            <main>
                <Outlet />
            </main>

            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            {showSearch && (
                <div onClick={() => setShowSearch(false)} className='close-search-bar'></div>
            )}

            <Link to={`/help`} className='question-mark'>?</Link>

            {/* <LoginContainer /> */}
        </>
    )
}
