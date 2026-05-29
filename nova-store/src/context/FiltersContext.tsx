import { createContext, ReactNode, useMemo, useState } from 'react';
import {
  defaultFilters,
  ProductFilters,
} from '../services/catalogService';

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

  const updateFilters = (updates: Partial<ProductFilters>) => {
    setFilters((currentFilters) => ({ ...currentFilters, ...updates }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const value = useMemo(
    () => ({ filters, updateFilters, clearFilters }),
    [filters]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
