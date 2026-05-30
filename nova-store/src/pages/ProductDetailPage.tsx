import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductImageGallery from '../components/product-detail/ProductImageGallery';
import ProductInfo from '../components/product-detail/ProductInfo';
import { useCart } from '../hooks/useCart';
import { useCatalog } from '../hooks/useCatalog';
import type { Product } from '../services/productTypes';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { error, loading, products } = useCatalog();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const product = products.find((item) => item.id === Number(id));

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return (
      <section className="page">
        <p className="cart-empty" role="alert">
          {error}
        </p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page">
        <h1>Producto no encontrado</h1>
        <Link to="/products">Volver al catalogo</Link>
      </section>
    );
  }

  const handleAddToCart = (selectedProduct: Product) => {
    addToCart(selectedProduct);
    setConfirmationMessage(`${selectedProduct.name} agregado al carrito.`);
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Catalogo', to: '/products' },
          { label: product.name },
        ]}
      />
      <section className="product-detail">
        <ProductImageGallery product={product} />
        <ProductInfo
          product={product}
          confirmationMessage={confirmationMessage}
          onAddToCart={handleAddToCart}
        />
      </section>
    </>
  );
};

export default ProductDetailPage;
