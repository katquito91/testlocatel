import { useMemo } from 'react';
import { filterProducts } from '../services/catalogService';
import { useCatalog } from './useCatalog';
import { useFilters } from './useFilters';

export const useProductFilters = () => {
  const { products } = useCatalog();
  const { filters } = useFilters();

  return useMemo(() => filterProducts(products, filters), [products, filters]);
};
