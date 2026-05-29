import { useState } from 'react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const isCartEmpty = items.length === 0;

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
    setFeedbackMessage('Producto eliminado del carrito.');
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity);
    setFeedbackMessage('Cantidad actualizada.');
  };

  return (
    <section className="page">
      <p className="eyebrow">Carrito</p>
      <h1>Tu carrito</h1>

      {feedbackMessage && (
        <p className="cart-feedback" role="status">
          {feedbackMessage}
        </p>
      )}

      <div className="cart-layout">
        {isCartEmpty ? (
          <p className="cart-empty">Tu carrito esta vacio.</p>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        )}
        <CartSummary
          subtotal={subtotal}
          tax={tax}
          total={total}
          isCheckoutDisabled={isCartEmpty}
        />
      </div>
    </section>
  );
};

export default CartPage;
