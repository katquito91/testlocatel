import { Product } from '../../services/catalogService';
import Button from '../Button';

interface AddToCartButtonProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const AddToCartButton = ({ product, onAddToCart }: AddToCartButtonProps) => {
  const isOutOfStock = product.inventoryStatus === 'out-of-stock';

  return (
    <Button disabled={isOutOfStock} onClick={() => onAddToCart(product)}>
      {isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
    </Button>
  );
};

export default AddToCartButton;
