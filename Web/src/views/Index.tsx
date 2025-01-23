import { Link } from "react-router-dom";
import ItemsList from "../components/ItemList/ItemsList";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useApp } from "../hooks/useApp";

export default function Index() {
    const { loading } = useApp()

    return (
        <>
            <div className="banner-container index-banner">
                <div className="banner-content">
                    <h1 className="banner-title">Faster Depot</h1>
                </div>
            </div>
            
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="container mt-2">
                    <div>
                        <h1>Productos más comprados</h1>
                        <ItemsList limit={6} />
                    </div>
                    
                    <div className="mt-2">
                        <h1>Nuestros productos</h1>
                        <ItemsList limit={10} />
                    </div>

                    <div className="center-div mt-1">
                        <Link to={'/products'} className="navigation-link">Ver todos los productos</Link>
                    </div>
                </div>
            )}

        </>
    )
}
