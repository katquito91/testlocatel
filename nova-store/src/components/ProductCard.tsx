import { Link } from 'react-router-dom';
import { Product } from '../services/catalogService';
import { formatCurrency } from '../utils/formatCurrency';
import Badge from './Badge';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const isOutOfStock = product.inventoryStatus === 'out-of-stock';
  const inventoryLabel = {
    'in-stock': 'Disponible',
    'low-stock': 'Pocas unidades',
    'out-of-stock': 'Sin stock',
  }[product.inventoryStatus];

  return (
    <article className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-card__content">
        {product.badge && <Badge label={product.badge} />}
        <p className="product-card__category">{product.category}</p>
        <p
          className={`product-card__inventory product-card__inventory--${product.inventoryStatus}`}
        >
          {inventoryLabel}
        </p>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{product.description}</p>
        <div className="product-card__meta">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{product.rating.toFixed(1)} / 5</span>
        </div>
        <Button disabled={isOutOfStock} onClick={() => onAddToCart(product)}>
          {isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
