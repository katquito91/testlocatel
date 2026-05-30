import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../Button';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  isCheckoutDisabled: boolean;
}

const CartSummary = ({
  subtotal,
  tax,
  total,
  isCheckoutDisabled,
}: CartSummaryProps) => (
  <aside className="cart-summary">
    <h2>Resumen</h2>
    <p>Subtotal: {formatCurrency(subtotal)}</p>
    <p>Impuestos: {formatCurrency(tax)}</p>
    <strong>Total: {formatCurrency(total)}</strong>
    {isCheckoutDisabled ? (
      <Button className="cart-summary__checkout" disabled>
        Ir a pagar
      </Button>
    ) : (
      <Link className="button button--primary cart-summary__checkout" to="/checkout">
        Ir a pagar
      </Link>
    )}
  </aside>
);

export default CartSummary;
