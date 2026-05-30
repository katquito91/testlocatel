import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';
import { useCartTotals } from '../hooks/useCartTotals';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const { subtotal, tax, total, isCartEmpty } = useCartTotals(items);

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
      <Breadcrumbs
        items={[
          { label: 'Catalogo', to: '/products' },
          { label: 'Carrito' },
        ]}
      />
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
