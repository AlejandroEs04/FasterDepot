import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import Layout from './layout/Layout'
import Index from './views/Index'
import Products from './views/Products'
import Product from './views/Product'
import Cart from './views/Cart'
import Checkout from './views/Checkout'
import Porfile from './views/Porfile'
import Purchases from './views/Purchases'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Index />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<Product />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='porfile' element={<Porfile />} />
            <Route path='porfile/purchases' element={<Purchases />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
