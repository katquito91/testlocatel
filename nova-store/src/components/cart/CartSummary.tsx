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
    <Button className="cart-summary__checkout" disabled={isCheckoutDisabled}>
      Ir a pagar
    </Button>
  </aside>
);

export default CartSummary;
