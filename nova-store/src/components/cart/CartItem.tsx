import { CartItem as CartItemType } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const CartItem = ({
  item,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) => (
  <article className="cart-item">
    <img
      className="cart-item__image"
      src={item.product.images.main}
      alt={item.product.name}
    />
    <div>
      <h2>{item.product.name}</h2>
      <p>{formatCurrency(item.product.price)}</p>
    </div>
    <label className="field">
      Cantidad
      <input
        type="number"
        min="1"
        max={item.product.stock}
        value={item.quantity}
        onChange={(event) =>
          onUpdateQuantity(item.product.id, Number(event.target.value))
        }
      />
    </label>
    <button
      className="link-button"
      type="button"
      onClick={() => onRemove(item.product.id)}
    >
      Eliminar
    </button>
  </article>
);

export default CartItem;
