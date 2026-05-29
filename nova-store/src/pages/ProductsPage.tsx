import PriceSlider from '../components/PriceSlider';
import ProductCard from '../components/ProductCard';
import SearchInput from '../components/SearchInput';
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useCatalog } from '../hooks/useCatalog';
import { useFilters } from '../hooks/useFilters';
import { useProductFilters } from '../hooks/useProductFilters';
import { InventoryStatus } from '../services/catalogService';

const ProductsPage = () => {
  const { categories, loading } = useCatalog();
  const { filters, updateFilters, clearFilters } = useFilters();
  const filteredProducts = useProductFilters();
  const { addToCart } = useCart();
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <section className="page">
      <div className="page__header">
        <div>
          <p className="eyebrow">Catalogo</p>
          <h1>Productos Nova Store</h1>
        </div>
        <button className="link-button" type="button" onClick={clearFilters}>
          Limpiar filtros
        </button>
      </div>

      <button
        className="filters-toggle"
        type="button"
        aria-expanded={areFiltersOpen}
        aria-controls="product-filters"
        onClick={() => setAreFiltersOpen((currentValue) => !currentValue)}
      >
        {areFiltersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>

      <div className="catalog-layout">
        <aside
          id="product-filters"
          className={`filters-panel ${
            areFiltersOpen ? 'filters-panel--open' : ''
          }`}
          aria-label="Filtros de productos"
        >
          <SearchInput
            value={filters.search}
            onChange={(search) => updateFilters({ search })}
          />
          <label className="field">
            Categoria
            <select
              value={filters.category}
              onChange={(event) =>
                updateFilters({ category: event.target.value })
              }
            >
              <option value="all">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <PriceSlider
            value={filters.maxPrice}
            onChange={(maxPrice) => updateFilters({ maxPrice })}
          />
          <label className="field">
            Inventario
            <select
              value={filters.inventoryStatus}
              onChange={(event) =>
                updateFilters({
                  inventoryStatus: event.target.value as InventoryStatus | 'all',
                })
              }
            >
              <option value="all">Todos</option>
              <option value="in-stock">Disponible</option>
              <option value="low-stock">Pocas unidades</option>
              <option value="out-of-stock">Sin stock</option>
            </select>
          </label>
          <label className="field">
            Ordenar
            <select
              value={filters.sortBy}
              onChange={(event) =>
                updateFilters({
                  sortBy: event.target.value as typeof filters.sortBy,
                })
              }
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio menor a mayor</option>
              <option value="price-desc">Precio mayor a menor</option>
              <option value="rating">Mejor rating</option>
            </select>
          </label>
        </aside>

        {filteredProducts.length === 0 ? (
          <p>No hay productos que coincidan con los filtros.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
