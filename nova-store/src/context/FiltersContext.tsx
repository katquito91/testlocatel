import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { defaultFilters } from '../services/productFilterService';
import type { ProductFilters } from '../services/productTypes';

interface FiltersContextValue {
  filters: ProductFilters;
  updateFilters: (updates: Partial<ProductFilters>) => void;
  clearFilters: () => void;
}

export const FiltersContext = createContext<FiltersContextValue | undefined>(
  undefined
);

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);

  const updateFilters = useCallback((updates: Partial<ProductFilters>) => {
    setFilters((currentFilters) => ({ ...currentFilters, ...updates }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const value = useMemo(
    () => ({ filters, updateFilters, clearFilters }),
    [filters, updateFilters, clearFilters]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
