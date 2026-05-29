import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { getProducts, Product } from '../services/catalogService';

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
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
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
