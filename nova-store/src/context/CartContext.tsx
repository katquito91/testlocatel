import { createContext, ReactNode, useMemo, useState } from 'react';
import type { Product } from '../services/productTypes';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    if (product.inventoryStatus === 'out-of-stock') return;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (!existingItem) {
        return [...currentItems, { product, quantity: 1 }];
      }

      return currentItems.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, product.stock),
            }
          : item
      );
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(quantity, item.product.stock)),
            }
          : item
      )
    );
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo(
    () => ({ items, totalItems, addToCart, removeFromCart, updateQuantity }),
    [items, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
