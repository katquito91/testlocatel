# Nova Store

Aplicación frontend de e-commerce construida con React y TypeScript. El código fuente vive en la carpeta `nova-store/`.

- **Autor:** Katherine Quintero
- **Versión del proyecto:** `0.1.0`

## Setup

Requisitos previos:

- Node.js (probado con `v26.0.0`)
- npm

Clonar el repositorio y entrar al directorio del proyecto:

```bash
git clone https://github.com/katquito91/testlocatel.git
cd testlocatel/nova-store
```

Configuración opcional de la API de productos. Por defecto se usa el mock definido en `src/config/api.ts`. Para apuntar a otro backend, crear `nova-store/.env`:

```env
REACT_APP_PRODUCTS_API_URL=https://tu-api.com/products
```

Después de cambiar variables de entorno, reiniciar el servidor de desarrollo.

## Instalación

Desde la carpeta `nova-store/`:

```bash
npm install
```

## Cómo correr el proyecto

Modo desarrollo:

```bash
npm start
```

La aplicación queda disponible en:

```text
http://localhost:3000
```

Rutas principales:

- `/` — Home
- `/products` — Catálogo con filtros
- `/product/:id` — Detalle de producto
- `/cart` — Carrito
- `/checkout` — Facturación y pago

Verificación recomendada antes de subir cambios:

```bash
npm run lint
npm test -- --watchAll=false
npm run build
```

## Stack elegido

| Tecnología | Uso |
|---|---|
| React 19 | UI y componentes |
| TypeScript | Tipado estático |
| Create React App | Tooling, build y tests |
| React Router v6 | Navegación y rutas |
| Context API | Estado global (catálogo, filtros, carrito) |
| CSS + variables | Estilos y diseño responsive |
| Jest + React Testing Library | Pruebas unitarias e integración |
| ESLint | Calidad de código |

## Arquitectura general

El proyecto separa responsabilidades por capas:

```text
nova-store/src/
  components/     # UI reutilizable (cards, carrito, breadcrumbs, etc.)
  pages/          # Vistas por ruta (ProductsPage, CartPage, CheckoutPage...)
  context/        # Estado global (CatalogContext, FiltersContext, CartContext)
  hooks/          # Acceso a contextos y lógica derivada (useCartTotals, useProductFilters)
  services/       # Datos y reglas de negocio (REST, filtros, tipos)
  config/         # Configuración (URL del backend)
  utils/          # Helpers (formatCurrency)
  styles/         # Variables CSS y reglas responsive
```

Flujo de datos:

1. `productRestService` obtiene y mapea productos desde el backend.
2. `CatalogContext` expone productos, categorías, loading y errores.
3. `FiltersContext` y `useProductFilters` aplican filtros y ordenamiento.
4. `CartContext` y `useCartTotals` gestionan items y totales del carrito.
5. Las páginas componen componentes y delegan la lógica a hooks y servicios.

## Scripts disponibles

| Script | Comando | Descripción |
|---|---|---|
| `start` | `npm start` | Servidor de desarrollo |
| `build` | `npm run build` | Build de producción |
| `test` | `npm test -- --watchAll=false` | Ejecutar pruebas una vez |
| `lint` | `npm run lint` | Análisis estático con ESLint |
| `eject` | `npm run eject` | Expone configuración de CRA (irreversible) |

## Tradeoffs

- **Context API vs Redux/Zustand:** Se eligió Context API por simplicidad y alcance del proyecto. Suficiente para catálogo, filtros y carrito, pero puede volverse limitante si el estado crece mucho.
- **Create React App vs Vite:** CRA ofrece configuración zero-config y Jest integrado, a costa de builds más lentos y menos flexibilidad que Vite.
- **CSS plano vs CSS Modules/styled-components:** CSS global con variables y archivos separados mantiene el setup simple, pero escala menos bien en equipos grandes.
- **Cache en memoria vs React Query/SWR:** La cache actual evita llamadas repetidas en la misma sesión sin agregar dependencias, pero no ofrece revalidación, stale time ni persistencia.
- **Lazy loading de rutas:** Reduce el bundle inicial, pero agrega un fallback de carga visible al navegar por primera vez a cada página.

## Decisiones relevantes

- **Servicios modulares:** `productTypes`, `productFilterService` y `productRestService` reemplazan un catálogo monolítico para facilitar pruebas y mantenimiento.
- **Componentes compartidos:** `Breadcrumbs`, `CartSummary`, `CartItem` y `Button` evitan duplicar UI entre páginas.
- **Hook `useCartTotals`:** Centraliza subtotal, impuestos y total para mantener consistencia entre carrito y checkout.
- **Configuración por entorno:** `REACT_APP_PRODUCTS_API_URL` permite cambiar el backend sin modificar código.
- **Manejo de errores en catálogo:** `CatalogContext` expone `error` cuando falla la carga de productos.
- **Performance:** Lazy loading de rutas, `loading`/`decoding` en imágenes, `useCallback` en contextos, `AbortController` en fetch y cache en memoria.
- **Testing:** Cobertura con pruebas unitarias (servicios, componentes) e integración (`App.integration.test.tsx` con flujos completos).
- **Documentación adicional:** Ver `NovaStoreChanges.md` para el detalle de cambios implementados.
