import { fireEvent, render, screen } from '@testing-library/react';
import type { CartItem as CartItemType } from '../../context/CartContext';
import CartItem from './CartItem';

const cartItem: CartItemType = {
  product: {
    id: 1,
    name: 'Nova Hoodie',
    description: 'Hoodie suave',
    category: 'Ropa',
    price: 59.99,
    rating: 4.8,
    imageUrl: 'hoodie.jpg',
    images: {
      main: 'hoodie-main.jpg',
      others: ['hoodie-other.jpg'],
    },
    badge: 'Nuevo',
    stock: 12,
    inventoryStatus: 'in-stock',
  },
  quantity: 2,
};

describe('CartItem', () => {
  it('renders product image, name, price, and quantity', () => {
    render(
      <CartItem
        item={cartItem}
        onRemove={jest.fn()}
        onUpdateQuantity={jest.fn()}
      />
    );

    expect(screen.getByRole('img', { name: /nova hoodie/i })).toHaveAttribute(
      'src',
      'hoodie-main.jpg'
    );
    expect(screen.getByRole('heading', { name: /nova hoodie/i })).toBeInTheDocument();
    expect(screen.getByText('$59.99')).toBeInTheDocument();
    expect(screen.getByLabelText(/cantidad/i)).toHaveValue(2);
  });

  it('calls callbacks when quantity changes or item is removed', () => {
    const onRemove = jest.fn();
    const onUpdateQuantity = jest.fn();

    render(
      <CartItem
        item={cartItem}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
      />
    );

    fireEvent.change(screen.getByLabelText(/cantidad/i), {
      target: { value: '3' },
    });
    fireEvent.click(screen.getByRole('button', { name: /eliminar/i }));

    expect(onUpdateQuantity).toHaveBeenCalledWith(1, 3);
    expect(onRemove).toHaveBeenCalledWith(1);
  });
});
