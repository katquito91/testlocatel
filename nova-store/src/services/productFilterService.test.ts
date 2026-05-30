import { defaultFilters, filterProducts } from './productFilterService';
import type { Product } from './productTypes';

const products: Product[] = [
  {
    id: 1,
    name: 'Nova Hoodie',
    description: 'Hoodie suave',
    category: 'Ropa',
    price: 59.99,
    rating: 4.8,
    imageUrl: 'hoodie.jpg',
    images: { main: 'hoodie.jpg', others: [] },
    badge: 'Nuevo',
    stock: 12,
    inventoryStatus: 'in-stock',
  },
  {
    id: 2,
    name: 'Nova Sneakers',
    description: 'Tenis ligeros',
    category: 'Calzado',
    price: 89.99,
    rating: 4.6,
    imageUrl: 'sneakers.jpg',
    images: { main: 'sneakers.jpg', others: [] },
    stock: 4,
    inventoryStatus: 'low-stock',
  },
  {
    id: 3,
    name: 'Nova Backpack',
    description: 'Mochila resistente',
    category: 'Accesorios',
    price: 44.99,
    rating: 4.5,
    imageUrl: 'backpack.jpg',
    images: { main: 'backpack.jpg', others: [] },
    stock: 0,
    inventoryStatus: 'out-of-stock',
  },
];

describe('filterProducts', () => {
  it('filters products by search, category, price, and inventory', () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      search: 'nova',
      category: 'Calzado',
      maxPrice: 100,
      inventoryStatus: 'low-stock',
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Nova Sneakers');
  });

  it('sorts products by price ascending', () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      sortBy: 'price-asc',
    });

    expect(result.map((product) => product.id)).toEqual([3, 1, 2]);
  });

  it('sorts products by rating descending', () => {
    const result = filterProducts(products, {
      ...defaultFilters,
      sortBy: 'rating',
    });

    expect(result.map((product) => product.id)).toEqual([1, 2, 3]);
  });
});
