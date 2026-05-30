import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

const backendProducts = [
  {
    id: 1,
    name: 'Nova Hoodie',
    description: 'Hoodie suave',
    category: 'Ropa',
    price: 59.99,
    rating: 4.8,
    imageUrl: 'https://example.com/hoodie-320x240.jpg',
    stock: 12,
    inventoryStatus: 'in-stock',
  },
  {
    id: 2,
    name: 'Nova Backpack',
    description: 'Mochila resistente',
    category: 'Accesorios',
    price: 44.99,
    rating: 4.5,
    imageUrl: 'https://example.com/backpack-320x240.jpg',
    stock: 0,
    inventoryStatus: 'out-of-stock',
  },
];

const fetchMock = jest.fn();

const mockProductsRequest = () => {
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => backendProducts,
  });
};

const renderAppAt = (route: string) => {
  window.history.pushState({}, '', route);
  render(<App />);
};

describe('Nova Store integration', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
    mockProductsRequest();
  });

  it('loads products and filters the catalog by search text', async () => {
    renderAppAt('/products');

    expect(await screen.findByRole('heading', { name: /nova hoodie/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /nova backpack/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/buscar productos/i), {
      target: { value: 'backpack' },
    });

    expect(screen.queryByRole('heading', { name: /nova hoodie/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /nova backpack/i })).toBeInTheDocument();
  });

  it('adds a product to the cart and completes the checkout form', async () => {
    renderAppAt('/products');

    await screen.findByRole('heading', {
      name: /nova hoodie/i,
    });

    fireEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }));
    fireEvent.click(screen.getByRole('link', { name: /carrito \(1\)/i }));

    expect(await screen.findByRole('heading', { name: /tu carrito/i })).toBeInTheDocument();
    expect(screen.getByText('Subtotal: $59.99')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /ir a pagar/i }));

    expect(
      await screen.findByRole('heading', {
        name: /datos de facturacion y pago/i,
      })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Katherine Quintero' },
    });
    fireEvent.change(screen.getByLabelText(/correo electronico/i), {
      target: { value: 'katherine@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/documento \/ nit/i), {
      target: { value: '123456789' },
    });
    fireEvent.change(screen.getByLabelText(/direccion de facturacion/i), {
      target: { value: 'Calle 123' },
    });
    fireEvent.change(screen.getByLabelText(/nombre en la tarjeta/i), {
      target: { value: 'Katherine Quintero' },
    });
    fireEvent.change(screen.getByLabelText(/numero de tarjeta/i), {
      target: { value: '4111111111111111' },
    });
    fireEvent.change(screen.getByLabelText(/vencimiento/i), {
      target: { value: '12/30' },
    });
    fireEvent.change(screen.getByLabelText(/cvv/i), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /realizar pago/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(
        'Datos recibidos. Tu pago esta listo para procesarse.'
      );
    });
  });
});
