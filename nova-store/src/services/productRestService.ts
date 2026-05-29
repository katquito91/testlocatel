import type { InventoryStatus, Product } from './productTypes';

const PRODUCTS_API_URL =
  'https://000a4cbe-cf59-467a-9928-0e94d391f532.mock.pstmn.io/products';

interface BackendProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  badge?: string;
  stock: number;
  inventoryStatus?: InventoryStatus;
}

const getInventoryStatus = (stock: number): InventoryStatus => {
  if (stock <= 0) return 'out-of-stock';
  if (stock <= 10) return 'low-stock';
  return 'in-stock';
};

const getProductBadge = (rating: number): string | undefined =>
  rating >= 4.6 ? 'Destacado' : undefined;

const mapBackendProductToProduct = (product: BackendProduct): Product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  category: product.category,
  price: product.price,
  rating: product.rating,
  imageUrl: product.imageUrl,
  badge: product.badge ?? getProductBadge(product.rating),
  stock: product.stock,
  inventoryStatus: product.inventoryStatus ?? getInventoryStatus(product.stock),
});

export const fetchProductsFromBackend = async (): Promise<Product[]> => {
  const response = await fetch(PRODUCTS_API_URL);

  if (!response.ok) {
    throw new Error(`Products request failed with status ${response.status}`);
  }

  const products = (await response.json()) as BackendProduct[];

  if (!Array.isArray(products)) {
    throw new Error('Products response must be an array');
  }

  return products.map(mapBackendProductToProduct);
};

export const getProducts = fetchProductsFromBackend;
