import type { Product } from '../../services/productTypes';
import { formatCurrency } from '../../utils/formatCurrency';
import AddToCartButton from './AddToCartButton';
import InventoryStatus from './InventoryStatus';
import ProductBadge from './ProductBadge';

interface ProductInfoProps {
  product: Product;
  confirmationMessage: string;
  onAddToCart: (product: Product) => void;
}

const ProductInfo = ({
  product,
  confirmationMessage,
  onAddToCart,
}: ProductInfoProps) => (
  <div className="product-info">
    <ProductBadge label={product.badge} />
    <p className="eyebrow">{product.category}</p>
    <h1>{product.name}</h1>
    <p>{product.description}</p>
    <p className="product-detail__price">{formatCurrency(product.price)}</p>
    <p>Rating: {product.rating.toFixed(1)} / 5</p>
    <InventoryStatus
      status={product.inventoryStatus}
      stock={product.stock}
    />
    <AddToCartButton product={product} onAddToCart={onAddToCart} />
    {confirmationMessage && (
      <p className="product-detail__confirmation" role="status">
        {confirmationMessage}
      </p>
    )}
  </div>
);

export default ProductInfo;
