import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartSummary from './CartSummary';

describe('CartSummary', () => {
  it('renders formatted totals and checkout link when checkout is enabled', () => {
    render(
      <MemoryRouter>
        <CartSummary
          isCheckoutDisabled={false}
          subtotal={100}
          tax={8}
          total={108}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Subtotal: $100.00')).toBeInTheDocument();
    expect(screen.getByText('Impuestos: $8.00')).toBeInTheDocument();
    expect(screen.getByText('Total: $108.00')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ir a pagar/i })).toHaveAttribute(
      'href',
      '/checkout'
    );
  });

  it('disables checkout action when checkout is disabled', () => {
    render(
      <MemoryRouter>
        <CartSummary
          isCheckoutDisabled
          subtotal={0}
          tax={0}
          total={0}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /ir a pagar/i })).toBeDisabled();
  });
});
