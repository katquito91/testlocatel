import { useMemo } from 'react';
import type { CartItem } from '../context/CartContext';

const TAX_RATE = 0.08;

export const useCartTotals = (items: CartItem[]) =>
  useMemo(() => {
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      total,
      isCartEmpty: items.length === 0,
    };
  }, [items]);
