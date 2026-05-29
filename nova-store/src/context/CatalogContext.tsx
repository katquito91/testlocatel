import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/productRestService';
import type { Product } from '../services/productTypes';

interface CatalogContextValue {
  products: Product[];
  categories: string[];
  loading: boolean;
}

export const CatalogContext = createContext<CatalogContextValue | undefined>(
  undefined
);

interface CatalogProviderProps {
  children: ReactNode;
}

export const CatalogProvider = ({ children }: CatalogProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getProducts().then((data) => {
      if (!isMounted) return;

      setProducts(data);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products]
  );

  const value = useMemo(
    () => ({ products, categories, loading }),
    [products, categories, loading]
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};
