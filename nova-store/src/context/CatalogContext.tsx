import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/productRestService';
import type { Product } from '../services/productTypes';

interface CatalogContextValue {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getProducts(controller.signal)
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }

        setError('No se pudieron cargar los productos. Intenta de nuevo mas tarde.');
      })
      .finally(() => {
        if (controller.signal.aborted) return;

        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products]
  );

  const value = useMemo(
    () => ({ products, categories, loading, error }),
    [products, categories, loading, error]
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};
