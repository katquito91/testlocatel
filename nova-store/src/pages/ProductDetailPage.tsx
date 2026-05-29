import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import ProductImageGallery from '../components/product-detail/ProductImageGallery';
import ProductInfo from '../components/product-detail/ProductInfo';
import { useCart } from '../hooks/useCart';
import { getProductById, Product } from '../services/catalogService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const product = getProductById(Number(id));

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
    <section className="product-detail">
      <ProductImageGallery product={product} />
      <ProductInfo
        product={product}
        confirmationMessage={confirmationMessage}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
};

export default ProductDetailPage;
