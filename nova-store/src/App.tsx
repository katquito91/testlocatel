import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { CatalogProvider } from './context/CatalogContext';
import { FiltersProvider } from './context/FiltersContext';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <CatalogProvider>
        <FiltersProvider>
          <CartProvider>
            <div className="app">
              <Navbar />
              <main className="app__main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </CartProvider>
        </FiltersProvider>
      </CatalogProvider>
    </BrowserRouter>
  );
}

export default App;
