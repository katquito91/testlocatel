import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';
import { getProductById } from '../services/catalogService';
import { formatCurrency } from '../utils/formatCurrency';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = getProductById(Number(id));

  if (!product) {
    return (
      <section className="page">
        <h1>Producto no encontrado</h1>
        <Link to="/products">Volver al catalogo</Link>
      </section>
    );
  }

  const isOutOfStock = product.inventoryStatus === 'out-of-stock';

  return (
    <section className="product-detail">
      <img src={product.imageUrl} alt={product.name} />
      <div>
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="product-detail__price">{formatCurrency(product.price)}</p>
        <p>Rating: {product.rating.toFixed(1)} / 5</p>
        <p>Stock: {product.stock} unidades</p>
        <Button disabled={isOutOfStock} onClick={() => addToCart(product)}>
          {isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
      </div>
    </section>
  );
};

export default ProductDetailPage;
