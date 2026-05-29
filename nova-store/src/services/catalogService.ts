export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  badge?: string;
  stock: number;
  inventoryStatus: InventoryStatus;
}

export interface ProductFilters {
  search: string;
  category: string;
  maxPrice: number;
  inventoryStatus: InventoryStatus | 'all';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Nova Hoodie',
    description: 'Hoodie suave para looks casuales y comodos.',
    category: 'Ropa',
    price: 59.99,
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/320x240?text=Nova+Hoodie',
    badge: 'Nuevo',
    stock: 12,
    inventoryStatus: 'in-stock',
  },
  {
    id: 2,
    name: 'Nova Sneakers',
    description: 'Tenis ligeros para uso diario.',
    category: 'Calzado',
    price: 89.99,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/320x240?text=Nova+Sneakers',
    badge: 'Top venta',
    stock: 4,
    inventoryStatus: 'low-stock',
  },
  {
    id: 3,
    name: 'Nova Backpack',
    description: 'Mochila resistente con multiples compartimentos.',
    category: 'Accesorios',
    price: 44.99,
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/320x240?text=Nova+Backpack',
    stock: 0,
    inventoryStatus: 'out-of-stock',
  },
];

export const defaultFilters: ProductFilters = {
  search: '',
  category: 'all',
  maxPrice: 100,
  inventoryStatus: 'all',
  sortBy: 'featured',
};

export const getProducts = (): Promise<Product[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(products), 300);
  });

export const getProductById = (id: number): Product | undefined =>
  products.find((product) => product.id === id);

export const filterProducts = (
  productList: Product[],
  filters: ProductFilters
): Product[] => {
  const normalizedSearch = filters.search.trim().toLowerCase();

  const filtered = productList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch);
    const matchesCategory =
      filters.category === 'all' || product.category === filters.category;
    const matchesPrice = product.price <= filters.maxPrice;
    const matchesInventory =
      filters.inventoryStatus === 'all' ||
      product.inventoryStatus === filters.inventoryStatus;

    return matchesSearch && matchesCategory && matchesPrice && matchesInventory;
  });

  return [...filtered].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id;
  });
};
