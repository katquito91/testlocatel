import type { Product, ProductFilters } from './productTypes';

export const defaultFilters: ProductFilters = {
  search: '',
  category: 'all',
  maxPrice: 100,
  inventoryStatus: 'all',
  sortBy: 'featured',
};

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
