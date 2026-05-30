# Cambios configurados en Nova Store

Este documento resume los cambios implementados en el proyecto `nova-store`, distinto del prompt original `PromptCreateNovaStore.md`.

## Proyecto base

- Se creó la aplicación React con TypeScript en `nova-store/`.
- Se configuró React Router con rutas principales:
  - `/`
  - `/products`
  - `/product/:id`
  - `/cart`
  - `/checkout`
- Se agregó el script de lint:

```bash
npm run lint
```

## Estructura principal

Se organizaron carpetas para separar responsabilidades:

```text
src/
  components/
  context/
  hooks/
  pages/
  services/
  styles/
  utils/
```

## Servicios y datos

- Se reemplazó el servicio de catálogo local por servicios REST.
- Se eliminó `catalogService.ts`.
- Se creó `productRestService.ts` para consumir:

```text
https://000a4cbe-cf59-467a-9928-0e94d391f532.mock.pstmn.io/products
```

- Se creó `productTypes.ts` para centralizar tipos de productos, inventario y filtros.
- Se creó `productFilterService.ts` para centralizar filtros y ordenamiento.
- Se creó `config/api.ts` para centralizar la URL del backend y permitir configurarla con `REACT_APP_PRODUCTS_API_URL`.
- Se agregó manejo de error en `CatalogContext` cuando falla la carga de productos.
- Se agregó soporte para imágenes del backend con esta estructura:

```json
{
  "images": {
    "main": "url-principal",
    "others": ["url-opcional"]
  }
}
```

## Catálogo

- Se creó `ProductsPage` como contenedor del catálogo.
- Se implementaron filtros por búsqueda, categoría, precio, inventario y ordenamiento.
- Se creó `ProductCard` con imagen, categoría, nombre, descripción, precio, rating, inventario, badge y CTA.
- Se ajustó el tamaño de imágenes en cards para mantener consistencia responsive.

## Detalle de producto

- Se creó `ProductDetailPage`.
- Se separó la vista en componentes:
  - `ProductImageGallery`
  - `ProductInfo`
  - `ProductBadge`
  - `InventoryStatus`
  - `AddToCartButton`
- Se agregó galería con imagen principal y miniaturas dinámicas.
- Se agregaron breadcrumbs reutilizables en la vista de detalle con enlace al catálogo y nombre del producto actual.
- Se agregó confirmación visual al agregar productos al carrito.

## Carrito

- Se creó `CartPage`.
- Se separó la UI en:
  - `CartItem`
  - `CartSummary`
- Se agregó imagen principal de producto en cada item del carrito.
- Se agregaron breadcrumbs reutilizables en el carrito con enlace al catálogo.
- Se agregó feedback visual para eliminar productos y actualizar cantidades.
- Se deshabilita el botón de pago cuando el carrito está vacío.
- Se estilizó el botón de checkout con bloque y margen superior.
- El botón `Ir a pagar` navega a `/checkout` cuando el carrito tiene productos.
- Se creó `useCartTotals` para centralizar subtotal, impuestos, total y estado de carrito vacío.

## Checkout

- Se creó `CheckoutPage`.
- Se agregó ruta `/checkout`.
- Se agregó formulario para datos de facturación:
  - Nombre completo
  - Correo electrónico
  - Documento / NIT
  - Dirección de facturación
- Se agregó formulario para datos de pago:
  - Nombre en la tarjeta
  - Número de tarjeta
  - Vencimiento
  - CVV
- Se muestra el resumen del carrito dentro del checkout.
- Si el carrito está vacío, el checkout muestra un mensaje indicando que se deben agregar productos antes de pagar.
- Se agregó confirmación visual al enviar los datos del checkout.
- Se reutiliza `useCartTotals` para mantener el cálculo del resumen alineado con el carrito.

## Estado global y hooks

- Se implementaron contextos:
  - `CatalogContext`
  - `FiltersContext`
  - `CartContext`
- Se agregaron hooks:
  - `useCatalog`
  - `useFilters`
  - `useCart`
  - `useProductFilters`
  - `useCartTotals`
- Se creó `Breadcrumbs` como componente compartido para navegación contextual.

## Responsive

- Se documentaron breakpoints en CSS:
  - Móvil pequeño: `<480px`
  - Móvil/tablet: `481-768px`
  - Desktop pequeño: `769-1024px`
  - Desktop grande: `>1024px`
- Se implementó menú hamburguesa en móvil.
- Los filtros funcionan como sidebar en desktop y panel colapsable en móvil.
- Se ajustaron imágenes de cards, detalle y miniaturas para desktop, tablet y móvil.
- Se movieron los estilos responsive a `styles/responsive.css` para separar estilos base y reglas por breakpoint.

## Performance

- Se agregó lazy loading de rutas con `React.lazy` y `Suspense` para dividir el código por página.
- Se agregaron atributos `loading` y `decoding` en imágenes de cards, galería y carrito para mejorar la carga del navegador.
- Se memoizaron callbacks de `CartContext` y `FiltersContext` con `useCallback` para reducir cambios de referencia en consumidores.
- Se agregó `AbortController` en la carga del catálogo para cancelar requests al desmontar el provider.
- Se agregó cache en memoria para productos en `productRestService.ts` y una utilidad controlada para limpiar la cache en pruebas.

## Pruebas unitarias

Se agregaron pruebas unitarias con Jest y React Testing Library para cubrir lógica de negocio y componentes principales:

- `productFilterService.test.ts` valida filtros combinados por búsqueda, categoría, precio e inventario, además de ordenamientos por precio y rating.
- `productRestService.test.ts` valida el mapeo de productos desde el backend, normalización de imágenes `320x240` a `320x320`, uso de imágenes principales y galería, campos derivados como `badge` e `inventoryStatus`, y errores HTTP.
- `CartSummary.test.tsx` valida la presentación de subtotal, impuestos y total, el enlace hacia `/checkout` cuando el pago está habilitado, y el botón deshabilitado cuando el carrito está vacío.
- `CartItem.test.tsx` valida la imagen principal del producto, datos visibles del item, cantidad seleccionada, actualización de cantidad y eliminación del producto.

Las pruebas agregadas se ejecutan con:

```bash
npm test -- --watchAll=false
```

## Pruebas de integración

Se agregó `App.integration.test.tsx` para validar flujos completos de la aplicación usando `App` con rutas, contextos reales y el servicio REST mockeado:

- Carga del catálogo desde datos simulados del backend.
- Filtrado del catálogo por texto de búsqueda.
- Agregar un producto al carrito desde el catálogo.
- Navegar desde el carrito hacia checkout.
- Completar y enviar el formulario de facturación y pago.
- Validar el mensaje de confirmación del checkout.

## Verificaciones ejecutadas

Durante la implementación se ejecutaron estas verificaciones:

```bash
npm run lint
npm test -- --watchAll=false
npm run build
```

Las verificaciones finalizaron correctamente. Las pruebas muestran advertencias de React Router sobre flags futuros de v7, pero no bloquean la ejecución.
