export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  images: {
    main: string;
    others: string[];
  };
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
