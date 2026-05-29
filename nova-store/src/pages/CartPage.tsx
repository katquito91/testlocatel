import Button from '../components/Button';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <section className="page">
      <p className="eyebrow">Carrito</p>
      <h1>Tu carrito</h1>

      {items.length === 0 ? (
        <p>Tu carrito esta vacio.</p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.product.id}>
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
                      updateQuantity(item.product.id, Number(event.target.value))
                    }
                  />
                </label>
                <button
                  className="link-button"
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <h2>Resumen</h2>
            <p>Subtotal: {formatCurrency(subtotal)}</p>
            <p>Impuestos: {formatCurrency(subtotal * 0.08)}</p>
            <strong>Total: {formatCurrency(subtotal * 1.08)}</strong>
            <Button>Ir a pagar</Button>
          </aside>
        </div>
      )}
    </section>
  );
};

export default CartPage;
