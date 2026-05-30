import type { InventoryStatus, Product } from './productTypes';
import { PRODUCTS_API_URL } from '../config/api';

interface BackendProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl?: string;
  images?: {
    main: string;
    others?: string[];
  };
  badge?: string;
  stock: number;
  inventoryStatus?: InventoryStatus;
}

let productsCache: Product[] | null = null;

export const clearProductsCache = () => {
  productsCache = null;
};

const getInventoryStatus = (stock: number): InventoryStatus => {
  if (stock <= 0) return 'out-of-stock';
  if (stock <= 10) return 'low-stock';
  return 'in-stock';
};

const getProductBadge = (rating: number): string | undefined =>
  rating >= 4.6 ? 'Destacado' : undefined;

const getSquareImageUrl = (imageUrl: string): string =>
  imageUrl.replace('320x240', '320x320');

const getProductImages = (product: BackendProduct): Product['images'] => {
  const mainImageUrl = product.images?.main ?? product.imageUrl ?? '';

  return {
    main: getSquareImageUrl(mainImageUrl),
    others: product.images?.others ?? [],
  };
};

const mapBackendProductToProduct = (product: BackendProduct): Product => {
  const images = getProductImages(product);

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    rating: product.rating,
    imageUrl: images.main,
    images,
    badge: product.badge ?? getProductBadge(product.rating),
    stock: product.stock,
    inventoryStatus:
      product.inventoryStatus ?? getInventoryStatus(product.stock),
  };
};

export const fetchProductsFromBackend = async (
  signal?: AbortSignal
): Promise<Product[]> => {
  if (productsCache) {
    return productsCache;
  }

  const response = await fetch(PRODUCTS_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Products request failed with status ${response.status}`);
  }

  const products = (await response.json()) as BackendProduct[];

  if (!Array.isArray(products)) {
    throw new Error('Products response must be an array');
  }

  productsCache = products.map(mapBackendProductToProduct);

  return productsCache;
};

export const getProducts = fetchProductsFromBackend;
