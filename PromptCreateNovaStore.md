---

# Guía paso a paso para crear la tienda virtual **Nova Store**

---

## Arquitectura Frontend y Buenas Prácticas

Antes de comenzar cada paso, se debe tener en cuenta:

- **Organización del proyecto:** estructura clara y lógica en carpetas (`components`, `pages`, `services`, `hooks`, `styles`, `utils`, `context`).
- **Escalabilidad:** facilitar crecimiento futuro sin romper estructura.
- **Separación de responsabilidades:** cada componente o módulo con única responsabilidad.
- **Modularidad:** dividir código en módulos independientes.
- **Reutilización:** componentes y lógica reutilizable para evitar duplicidad.
- **Naming:** nombres claros y consistentes para archivos, funciones y variables.
- **Patrones frontend:** uso de presentational/container components, custom hooks, contexto para estado global.

---

## Paso 0: Crear la aplicación React "Nova Store"

### 0.1 Inicialización

- Crear proyecto React llamado **nova-store**.
- Configurar `.gitignore` y repositorio Git.

### 0.2 Estructura de carpetas

```
src/
 ├─ components/      # Componentes UI reutilizables
 ├─ pages/           # Vistas principales
 ├─ services/        # Funciones para datos/APIs
 ├─ hooks/           # Custom hooks reutilizables
 ├─ styles/          # Estilos globales/variables
 ├─ utils/           # Funciones utilitarias
 └─ context/         # Contextos para estado global
```

### 0.3 Configuración de rutas

- Instalar y configurar React Router.
- Rutas principales:
  - `/` (Home)
  - `/products` (Catálogo)
  - `/product/:id` (Detalle producto)
  - `/cart` (Carrito)

### 0.4 Manejo de estado global

- Implementar React Context para catálogo, filtros y carrito.
- Hooks personalizados para acceso y manipulación (`useCatalog`, `useFilters`, `useCart`).

### 0.5 Crear componentes base reutilizables

- `Button`, `ProductCard`, `Badge`, `SearchInput`, `PriceSlider`, etc.
- Responsabilidad única y fácil reutilización.

### 0.6 Datos mock

- Crear archivo JSON o JS con productos simulados.
- Funciones en `services/catalogService.js` para obtener y filtrar productos.

### 0.7 Estilos base

- Variables globales para colores, tipografías.
- Metodología CSS Modules, SCSS o styled-components.
- Estilos base para componentes UI.

### 0.8 Pruebas iniciales

- Renderizar listado básico de productos en `/products`.
- Verificar navegación y estado global funcional.

---

## Paso 1: Crear la vista principal de la tienda

### 1.1 Página `ProductsPage`

- Contenedor que obtiene productos y maneja lógica de filtrado.
- Renderiza lista de `ProductCard`.

### 1.2 Componente `ProductCard`

- Muestra imagen, nombre, precio, categoría, rating, estado inventario, badge y botón CTA.

### 1.3 Barra de navegación (`Navbar`)

- Logo “Nova Store”.
- Lista de categorías.
- Navegación a home, catálogo y carrito.

### 1.4 Integración con estado global

- Usar contexto para obtener productos.
- Mostrar datos mock dinámicamente.

### 1.5 Componentización y separación

- `ProductsPage`: lógica.
- `ProductCard`: presentación.

### 1.6 Estilo base

- Grid o flexbox para mostrar catálogo limpio y ordenado.

### 1.7 Pruebas visuales

- Confirmar renderizado correcto y funcionalidad básica CTA.

---

## Paso 2: Crear filtros y búsqueda

### 2.1 Componentes de filtros

- `SearchBar`: input texto para búsqueda.
- `CategoryFilter`: lista categorías.
- `PriceRangeFilter`: slider para rango de precio.
- `InventoryFilter`: checkbox o dropdown estado inventario.
- `SortOptions`: dropdown para ordenamiento.

### 2.2 Panel de filtros (`FiltersPanel`)

- Agrupa todos los filtros.
- Diseño adaptable: sidebar en desktop, modal/dropdown en móvil.

### 2.3 Estado de filtros

- Usar contexto o estado local en `ProductsPage`.
- Hook personalizado `useProductFilters` para lógica combinada.

### 2.4 Lógica de filtrado

- Filtrar y ordenar según criterios seleccionados.
- Combinación de filtros dinámica.

### 2.5 Actualización dinámica

- Vista del catálogo se actualiza conforme cambian filtros.

### 2.6 UX y estilo

- Mostrar filtros aplicados, botón limpiar filtros.
- Mensajes para listas vacías.

---

## Paso 3: Crear vista detallada del producto

### 3.1 `ProductDetailPage`

- Obtener `id` de producto por ruta.
- Extraer datos completos usando contexto o servicio.

### 3.2 Componentes internos

- `ProductImageGallery`: imagen principal y miniaturas.
- `ProductInfo`: nombre, descripción, categoría, precio, rating.
- `ProductBadge`: badge destacado.
- `InventoryStatus`: estado inventario.
- `AddToCartButton`: CTA para agregar.

### 3.3 Diseño visual

- Imagen e información lado a lado (vertical en móviles).
- Precio destacado, rating visible.
- Descripción clara.

### 3.4 Funcionalidad CTA

- Agregar producto al carrito si disponible.
- Confirmación visual (toast, notificación).

### 3.5 Productos relacionados (opcional)

- Lista de productos similares o destacados.

### 3.6 Patrones de arquitectura

- Separar lógica (container) y presentación (presentational).
- Usar hooks para lógica interna.

### 3.7 Estilo responsive

- Adaptar diseño a móviles y desktop.

---

## Paso 4: Crear vista y funcionalidades del carrito

### 4.1 `CartPage`

- Contenedor que muestra lista de productos agregados.

### 4.2 Componentes internos

- `CartItem`: muestra producto, cantidad editable, eliminar.
- `CartSummary`: subtotal, impuestos, total final, botón pagar.

### 4.3 Estado del carrito

- Contexto para manejo global de productos y cantidades.
- Funciones para agregar, eliminar, modificar cantidades.

### 4.4 Validaciones

- Limitar cantidades según stock.
- Evitar cantidades negativas o cero.

### 4.5 Feedback e interacción

- Confirmaciones visuales para acciones.
- Deshabilitar pago si carrito vacío.

### 4.6 Modularidad y separación

- Lógica central en `CartPage` o hooks (`useCart`).
- UI en componentes presentacionales.

### 4.7 Estilo y responsive

- Lista vertical, diseños claros.
- Botones grandes y accesibles en móvil.

---

## Paso 5: Implementar diseño responsive

### 5.1 Puntos de quiebre

- Móvil pequeño (<480px)
- Móvil grande/tablet (481-768px)
- Desktop pequeño (769-1024px)
- Desktop grande (>1024px)

### 5.2 Técnicas

- Flexbox y CSS Grid para layouts flexibles.
- Media queries para adaptar estilos.
- Unidades relativas (%, rem, em).

### 5.3 Adaptaciones clave

- Navbar: menú hamburguesa en móvil, desplegable en desktop.
- Catálogo: columnas variables según pantalla.
- Filtros: sidebar en desktop, modal/dropdown en móvil.
- Detalle producto y carrito con pilas verticales en móvil.

### 5.4 Usabilidad táctil

- Botones grandes y espaciados.
- Navegación accesible.

### 5.5 Pruebas cross-device

- Simulación en herramientas de desarrollo.
- Ajuste para diferentes resoluciones.

### 5.6 Mantenibilidad

- Organizar estilos responsive modularmente.
- Documentar breakpoints y reglas.
