# Decisiones técnicas — Nova Store

Documento de decisiones arquitectónicas y de implementación del proyecto `nova-store`.

- **Autor:** Katherine Quintero
- **Versión del proyecto:** `0.1.0`

## 1. Stack y tooling

### React + TypeScript con Create React App

**Decisión:** Usar React 19 con TypeScript sobre Create React App.

**Alternativas consideradas:** Vite, Next.js.

**Motivo:** CRA ofrece configuración zero-config, Jest integrado y un flujo conocido para proyectos de alcance acotado. Vite habría sido más rápido en build, pero implicaba más configuración inicial para testing.

**Tradeoff:** Builds más lentos y menor flexibilidad que Vite.

---

### React Router v6

**Decisión:** Navegación con React Router v6 y rutas declarativas en `App.tsx`.

**Rutas definidas:**

- `/` — Home
- `/products` — Catálogo
- `/product/:id` — Detalle
- `/cart` — Carrito
- `/checkout` — Checkout

**Motivo:** Separación clara de vistas por URL y soporte nativo para parámetros dinámicos (`:id`).

---

## 2. Arquitectura

### Organización por capas

**Decisión:** Estructura por responsabilidad, no por feature.

```text
src/
  components/   # UI reutilizable
  pages/        # Vistas por ruta
  context/      # Estado global
  hooks/        # Lógica derivada y acceso a contextos
  services/     # Datos y reglas de negocio
  config/       # Configuración externa
  utils/        # Helpers
  styles/       # Variables y responsive
```

**Motivo:** Facilita localizar código, mantener separación de responsabilidades y escalar el proyecto de forma predecible.

---

### Context API para estado global

**Decisión:** Tres contextos independientes:

- `CatalogContext` — productos, categorías, loading, error
- `FiltersContext` — filtros del catálogo
- `CartContext` — items del carrito y acciones

**Alternativas consideradas:** Redux, Zustand.

**Motivo:** El alcance del estado es acotado (catálogo, filtros, carrito). Context API evita dependencias adicionales y mantiene el código simple.

**Tradeoff:** Si el estado crece significativamente, puede requerir migración a una librería de estado más robusta.

---

### Servicios modulares en lugar de catálogo monolítico

**Decisión:** Dividir la lógica de datos en:

- `productTypes.ts` — tipos e interfaces
- `productFilterService.ts` — filtros y ordenamiento
- `productRestService.ts` — fetch y mapeo del backend

**Motivo:** Cada módulo tiene una responsabilidad clara, es testeable de forma aislada y facilita cambios en el backend sin afectar la UI.

**Contexto:** Se eliminó `catalogService.ts` en favor de esta estructura.

---

## 3. Datos y backend

### Consumo REST con mock de Postman

**Decisión:** Obtener productos desde un endpoint REST mock:

```text
https://000a4cbe-cf59-467a-9928-0e94d391f532.mock.pstmn.io/products
```

**Motivo:** Permite desarrollar el frontend de forma independiente del backend real.

---

### Configuración por variable de entorno

**Decisión:** Centralizar la URL en `config/api.ts` con override via `REACT_APP_PRODUCTS_API_URL`.

**Motivo:** Cambiar el backend entre entornos (mock, staging, producción) sin modificar código fuente.

---

### Mapeo de productos en el servicio

**Decisión:** `productRestService` normaliza la respuesta del backend al tipo `Product`:

- Imágenes `320x240` → `320x320`
- `badge` e `inventoryStatus` derivados si el backend no los envía
- Soporte para galería (`images.main` + `images.others`)

**Motivo:** La UI consume un contrato estable independientemente de inconsistencias del backend.

---

### Cache en memoria

**Decisión:** Cachear productos en memoria tras la primera carga exitosa.

**Alternativas consideradas:** React Query, SWR.

**Motivo:** Evita llamadas repetidas en la misma sesión sin agregar dependencias.

**Tradeoff:** No hay revalidación, stale time ni persistencia entre recargas.

---

### AbortController en carga de catálogo

**Decisión:** Cancelar el fetch de productos al desmontar `CatalogProvider`.

**Motivo:** Evita actualizaciones de estado en componentes desmontados y libera recursos de red.

---

## 4. UI y componentización

### Componentes compartidos

**Decisión:** Extraer piezas reutilizables:

| Componente | Uso |
|---|---|
| `Breadcrumbs` | Navegación contextual en detalle, carrito y checkout |
| `CartSummary` | Resumen de totales en carrito y checkout |
| `CartItem` | Item editable del carrito |
| `Button`, `Badge` | Elementos base de UI |
| `ProductCard` | Tarjeta de producto en catálogo |

**Motivo:** Evitar duplicación de markup y mantener consistencia visual.

---

### Detalle de producto modular

**Decisión:** Dividir `ProductDetailPage` en:

- `ProductImageGallery`
- `ProductInfo`
- `ProductBadge`
- `InventoryStatus`
- `AddToCartButton`

**Motivo:** Cada pieza encapsula una responsabilidad visual y facilita pruebas y mantenimiento.

---

### Hook `useCartTotals`

**Decisión:** Centralizar cálculo de subtotal, impuestos (8%), total y estado de carrito vacío.

**Motivo:** `CartPage` y `CheckoutPage` comparten la misma lógica de totales. Un hook evita inconsistencias.

---

## 5. Estilos y responsive

### CSS plano con variables

**Decisión:** CSS global con `styles/variables.css` para tokens de diseño y `App.css` para estilos base.

**Alternativas consideradas:** CSS Modules, styled-components, Tailwind.

**Motivo:** Setup simple, sin dependencias adicionales, adecuado para el alcance del proyecto.

**Tradeoff:** Menor encapsulación; en equipos grandes puede generar conflictos de nombres.

---

### Estilos responsive separados

**Decisión:** Mover media queries a `styles/responsive.css`.

**Breakpoints:**

- Móvil pequeño: `<480px`
- Móvil/tablet: `481-768px`
- Desktop pequeño: `769-1024px`
- Desktop grande: `>1024px`

**Motivo:** Separar reglas responsive de estilos base mejora legibilidad y mantenimiento.

---

## 6. Performance

### Lazy loading de rutas

**Decisión:** Cargar páginas con `React.lazy` y `Suspense`.

**Motivo:** Reduce el bundle inicial; cada ruta se descarga solo cuando el usuario la visita.

**Tradeoff:** Muestra un fallback (`Cargando vista...`) en la primera navegación a cada página.

---

### Atributos de carga en imágenes

**Decisión:**

- Cards, miniaturas y carrito: `loading="lazy"` + `decoding="async"`
- Imagen principal del detalle: `loading="eager"`

**Motivo:** Priorizar la imagen visible del detalle y diferir el resto para mejorar tiempos de carga percibidos.

---

### Memoización de callbacks en contextos

**Decisión:** `useCallback` en acciones de `CartContext` y `FiltersContext`.

**Motivo:** Evitar recrear funciones en cada render y reducir re-renders innecesarios en consumidores.

---

## 7. Manejo de errores

### Estado de error en catálogo

**Decisión:** `CatalogContext` expone `error: string | null` cuando falla la carga de productos.

**Motivo:** Las páginas de catálogo y detalle muestran un mensaje claro al usuario en lugar de quedar en blanco.

---

## 8. Testing

### Jest + React Testing Library

**Decisión:** Pruebas unitarias e integración con el stack incluido en CRA.

**Cobertura:**

| Tipo | Archivos | Qué valida |
|---|---|---|
| Unitarias | `productFilterService.test.ts` | Filtros y ordenamiento |
| Unitarias | `productRestService.test.ts` | Mapeo REST, cache, errores HTTP |
| Unitarias | `CartSummary.test.tsx`, `CartItem.test.tsx` | Componentes de carrito |
| Integración | `App.integration.test.tsx` | Flujo catálogo → carrito → checkout |
| Smoke | `App.test.tsx` | Renderizado de la app |

**Motivo:** Validar lógica de negocio de forma aislada y flujos completos con contextos reales.

---

## 9. Decisiones descartadas

| Alternativa | Por qué se descartó |
|---|---|
| Redux / Zustand | Complejidad innecesaria para el alcance actual |
| React Query / SWR | Dependencia extra; cache en memoria es suficiente por ahora |
| CSS Modules / styled-components | Mayor setup sin beneficio claro en este proyecto |
| Datos mock locales | Se prefirió REST mock para simular un backend real |
| Persistencia del carrito (localStorage) | Fuera del alcance inicial; el carrito vive en memoria |

## 10. Verificación del proyecto

Evaluación del estado actual de Nova Store contra los criterios técnicos del proyecto.

**Resultado general:** el proyecto cumple bien en arquitectura, organización, estado y testing base. Cumple parcialmente en performance y accesibilidad.

Verificación ejecutada:

```bash
npm test -- --watchAll=false  # 6 suites, 14 tests — OK
npm run build                 # Compila con chunks por ruta — OK
```

---

## 11. Qué haría con más tiempo

1. **Accesibilidad:** skip link, focus trap en menú móvil, pruebas con `jest-axe`, auditoría de contraste.
2. **Estado:** persistir carrito en `localStorage` y sincronizar al recargar.
3. **Performance:** migrar a Vite, adoptar React Query para cache/revalidación, `React.memo` en listas.
4. **Testing:** E2E con Playwright, ampliar cobertura de páginas y hooks, reporte de coverage.
5. **UX:** skeleton loaders en lugar de “Cargando…”, retry en errores de catálogo, toast notifications.
6. **Producción:** CI/CD con GitHub Actions, despliegue automatizado, variables por entorno.
7. **Arquitectura:** migrar a organización por features si el proyecto crece (`features/catalog`, `features/cart`).

---

## 12. Referencias

- [README.md](./README.md) — Setup, instalación y scripts
- [NovaStoreChanges.md](./NovaStoreChanges.md) — Detalle de cambios implementados
- [ia.md](./ia.md) — Uso de inteligencia artificial en el desarrollo
- [PromptCreateNovaStore.md](./PromptCreateNovaStore.md) — Guía original del proyecto
