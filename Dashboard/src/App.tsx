import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import Index from './pages/Index'
import Products from './pages/Products/Products'
import RegisterProduct from './pages/Products/RegisterProduct'
import { AppProvider } from './context/AppProvider'
import EditProduct from './pages/Products/EditProduct'

function App() {
  return (
    <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Index />} />
              <Route path='products' element={<Products />} />
              <Route path='products/add' element={<RegisterProduct />} />
              <Route path='products/edit/:id' element={<EditProduct />} />
            </Route>
          </Routes>
        </AppProvider>
    </BrowserRouter>
  )
}

export default App
