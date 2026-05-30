import { FormEvent, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';
import { useCartTotals } from '../hooks/useCartTotals';

const CheckoutPage = () => {
  const { items } = useCart();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const { subtotal, tax, total, isCartEmpty } = useCartTotals(items);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmationMessage('Datos recibidos. Tu pago esta listo para procesarse.');
  };

  return (
    <section className="page">
      <Breadcrumbs
        items={[
          { label: 'Catalogo', to: '/products' },
          { label: 'Carrito', to: '/cart' },
          { label: 'Pago' },
        ]}
      />

      <p className="eyebrow">Checkout</p>
      <h1>Datos de facturacion y pago</h1>

      {isCartEmpty ? (
        <p className="cart-empty">
          Tu carrito esta vacio. Agrega productos antes de realizar el pago.
        </p>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Datos para la factura</legend>
              <label className="field">
                Nombre completo
                <input name="fullName" required type="text" />
              </label>
              <label className="field">
                Correo electronico
                <input name="email" required type="email" />
              </label>
              <label className="field">
                Documento / NIT
                <input name="documentId" required type="text" />
              </label>
              <label className="field">
                Direccion de facturacion
                <input name="billingAddress" required type="text" />
              </label>
            </fieldset>

            <fieldset>
              <legend>Datos de pago</legend>
              <label className="field">
                Nombre en la tarjeta
                <input name="cardName" required type="text" />
              </label>
              <label className="field">
                Numero de tarjeta
                <input
                  inputMode="numeric"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  required
                  type="text"
                />
              </label>
              <div className="checkout-form__row">
                <label className="field">
                  Vencimiento
                  <input name="expiration" placeholder="MM/AA" required type="text" />
                </label>
                <label className="field">
                  CVV
                  <input inputMode="numeric" name="cvv" required type="password" />
                </label>
              </div>
            </fieldset>

            <button className="button button--primary" type="submit">
              Realizar pago
            </button>

            {confirmationMessage && (
              <p className="cart-feedback" role="status">
                {confirmationMessage}
              </p>
            )}
          </form>

          <CartSummary
            isCheckoutDisabled={isCartEmpty}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
