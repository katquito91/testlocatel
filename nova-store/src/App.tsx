import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/responsive.css';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { CatalogProvider } from './context/CatalogContext';
import { FiltersProvider } from './context/FiltersContext';

const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));

function App() {
  return (
    <BrowserRouter>
      <CatalogProvider>
        <FiltersProvider>
          <CartProvider>
            <div className="app">
              <Navbar />
              <main className="app__main">
                <Suspense fallback={<p>Cargando vista...</p>}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </CartProvider>
        </FiltersProvider>
      </CatalogProvider>
    </BrowserRouter>
  );
}

export default App;
