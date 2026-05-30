import { fetchProductsFromBackend } from './productRestService';

describe('fetchProductsFromBackend', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it('maps backend product images and optional gallery images', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: 'Nova Hoodie',
          description: 'Hoodie suave',
          category: 'Ropa',
          price: 59.99,
          rating: 4.8,
          images: {
            main: 'https://example.com/main-320x240.jpg',
            others: ['https://example.com/other.jpg'],
          },
          badge: 'Nuevo',
          stock: 12,
          inventoryStatus: 'in-stock',
        },
      ],
    });

    const products = await fetchProductsFromBackend();

    expect(products[0]).toMatchObject({
      id: 1,
      imageUrl: 'https://example.com/main-320x320.jpg',
      images: {
        main: 'https://example.com/main-320x320.jpg',
        others: ['https://example.com/other.jpg'],
      },
      badge: 'Nuevo',
      inventoryStatus: 'in-stock',
    });
  });

  it('falls back to imageUrl and derives optional fields when backend omits them', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 2,
          name: 'Nova Sneakers',
          description: 'Tenis ligeros',
          category: 'Calzado',
          price: 89.99,
          rating: 4.7,
          imageUrl: 'https://example.com/sneakers-320x240.jpg',
          stock: 4,
        },
      ],
    });

    const products = await fetchProductsFromBackend();

    expect(products[0]).toMatchObject({
      imageUrl: 'https://example.com/sneakers-320x320.jpg',
      images: {
        main: 'https://example.com/sneakers-320x320.jpg',
        others: [],
      },
      badge: 'Destacado',
      inventoryStatus: 'low-stock',
    });
  });

  it('throws when the backend response is not successful', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchProductsFromBackend()).rejects.toThrow(
      'Products request failed with status 500'
    );
  });
});
