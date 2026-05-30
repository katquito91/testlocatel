# Uso de inteligencia artificial — Nova Store

Documento de transparencia sobre cómo se utilizó IA en el desarrollo del proyecto **Nova Store** (`nova-store/`).

- **Autor:** Katherine Quintero
- **Herramienta principal:** [Cursor](https://cursor.com) (agente Composer)
- **Período:** Mayo 2026

---

## Herramientas IA utilizadas

| Herramienta | Uso |
|---|---|
| **Cursor (Composer / Agent)** | Generación de código, refactorización, pruebas, documentación, verificación de criterios técnicos y operaciones Git asistidas |
| **Prompt estructurado propio** | `PromptCreateNovaStore.md` como guía de alcance y criterios de aceptación por pasos |

No se utilizaron otras herramientas de IA (Copilot, ChatGPT externo, etc.) de forma separada; todo el flujo de desarrollo asistido ocurrió dentro de Cursor.

---

## Prompts relevantes

### Guía y alcance del proyecto

- Crear el documento `PromptCreateNovaStore.md` con la guía paso a paso (Pasos 0–5).
- Ejecutar el **Paso 0** paso a paso: proyecto CRA + TypeScript, estructura de carpetas, rutas, contextos y componentes base.
- Verificar y completar pendientes de los **Pasos 1–5** (catálogo, filtros, detalle, carrito, responsive).

### Integración con backend

- Crear servicios REST para `https://000a4cbe-cf59-467a-9928-0e94d391f532.mock.pstmn.io/products`.
- Eliminar `catalogService.ts` y `productFallbackData.ts` al migrar a REST puro.
- Corregir mapeo de `imageUrl` e imágenes `{ main, others }` desde el backend.

### UI, estilos y UX

- Ajustar tamaños de imágenes en cards, galería y carrito (320×320, responsive por breakpoint).
- Agregar galería dinámica en `ProductImageGallery` con datos reales del servicio.
- Crear `Breadcrumbs` reutilizable en detalle, carrito y checkout.
- Agregar página `/checkout` con formularios de facturación y pago.
- Aplicar reglas CSS concretas (por ejemplo, `.product-card img { height: 320px; object-fit: contain; }`).

### Calidad, performance y pruebas

- Agregar tests unitarios e integración (servicios, componentes de carrito, flujo catálogo → checkout).
- Verificar calidad técnica: clean code, componentización, tipado, estado, errores, escalabilidad.
- Verificar performance: lazy loading, imágenes, code splitting, memoización, fetch/cache.
- Implementar mejoras recomendadas: `React.lazy`, `Suspense`, `AbortController`, cache en memoria, `useCallback`.

### Documentación

- Crear `NovaStoreChanges.md` con cambios distintos al prompt original.
- Estructurar `README.md` (setup, instalación, stack, arquitectura, scripts, tradeoffs).
- Crear `decisiones.md` con decisiones arquitectónicas, tradeoffs y sección “Qué haría con más tiempo”.

---

## Casos de uso

| Caso de uso | Descripción |
|---|---|
| **Scaffolding inicial** | Creación del proyecto React, carpetas, rutas, contextos y componentes base siguiendo `PromptCreateNovaStore.md` |
| **Implementación iterativa por pasos** | Verificación de cada paso del prompt y corrección de pendientes bajo demanda |
| **Refactor de servicios** | Separación de `productTypes`, `productFilterService` y `productRestService`; eliminación de catálogo monolítico |
| **Corrección de integración REST** | Normalización de imágenes, tipos y manejo de errores HTTP |
| **Componentización** | Extracción de `CartItem`, `CartSummary`, subcomponentes de detalle, `Breadcrumbs`, `useCartTotals` |
| **Ajustes visuales puntuales** | CSS responsive, tamaños de imagen, estilos de botones y layout del carrito |
| **Testing asistido** | Generación de suites unitarias, de integración y smoke tests con mocks del backend |
| **Auditoría técnica** | Revisión contra criterios de arquitectura, performance, accesibilidad y testing |
| **Documentación del proyecto** | Redacción y mantenimiento de README, changelog y decisiones técnicas |
| **Operaciones Git** | Mensajes de commit, commits y push bajo instrucción explícita |

---

## Qué fue generado con IA

### Código de aplicación

- Estructura completa de `nova-store/src/`: pages, components, context, hooks, services, config, utils, styles.
- Contextos: `CatalogContext`, `FiltersContext`, `CartContext`.
- Servicios: `productRestService.ts`, `productFilterService.ts`, `productTypes.ts`, `config/api.ts`.
- Páginas: `ProductsPage`, `ProductDetailPage`, `CartPage`, `CheckoutPage`, `HomePage`.
- Componentes: `ProductCard`, `Breadcrumbs`, galería de detalle, carrito, filtros, layout responsive.
- Hooks: `useCatalog`, `useCart`, `useFilters`, `useProductFilters`, `useCartTotals`.
- Optimizaciones: lazy loading de rutas, cache en memoria, `AbortController`, memoización en contextos.

### Pruebas

- `productFilterService.test.ts`
- `productRestService.test.ts`
- `CartItem.test.tsx`, `CartSummary.test.tsx`
- `App.integration.test.tsx`, `App.test.tsx`

### Documentación

- Borrador inicial de `README.md`, `NovaStoreChanges.md` y `decisiones.md`.
- Formato y organización de `PromptCreateNovaStore.md` a partir del contenido provisto.

---

## Qué fue modificado manualmente

La IA generó la base, pero Katherine Quintero dirigió el alcance, validó resultados y aplicó cambios concretos:

| Área | Intervención manual |
|---|---|
| **Guía del proyecto** | Redacción y definición del contenido de `PromptCreateNovaStore.md` (arquitectura, pasos 0–5, criterios) |
| **Decisiones de arquitectura** | Elegir REST real en lugar de mock local; eliminar fallback de datos; configuración por `REACT_APP_PRODUCTS_API_URL` |
| **Estilos CSS** | Especificar valores exactos (320px, 420px, 100px en miniaturas), reglas de `object-fit` y layout del botón de checkout |
| **Contrato del backend** | Indicar estructura de imágenes `{ main, others }` y corregir mapeo cuando el servicio no coincidía con la UI |
| **Alcance funcional** | Solicitar checkout, breadcrumbs, imágenes en carrito y feedback visual paso a paso |
| **Documentación** | Autor (Katherine Quintero), versión del proyecto, URL de clonado, eliminación de línea de versión npm |
| **`decisiones.md`** | Edición de sección 10 (eliminar checklist detallado), renumerar sección 11 y quitar conclusión |
| **Validación** | Ejecutar `npm start`, `npm test`, `npm run build`, revisar UI en navegador y aprobar/rechazar cambios |
| **Git** | Decidir cuándo commitear y pushear; revisar mensajes de commit antes de confirmar |

En la práctica, el flujo fue **dirigido por la desarrolladora**: la IA propuso e implementó, y los prompts iterativos definieron qué conservar, corregir o descartar.

---

## Reflexión del uso de IA

### Ventajas observadas

- **Velocidad de arranque:** El Paso 0 (proyecto base, rutas, contextos, estructura) se completó en una fracción del tiempo de un setup manual.
- **Consistencia estructural:** La IA mantuvo convenciones de carpetas, nombres y separación de responsabilidades alineadas con la guía.
- **Cobertura amplia:** En una sesión se abarcó UI, servicios, tests, performance básica y documentación.
- **Iteración guiada:** Los prompts cortos y específicos (“ajustar imagen a 320×320”, “agregar breadcrumbs”) fueron eficaces para refinar sin reescribir todo.

### Limitaciones y riesgos

- **Decisiones implícitas:** La IA puede introducir patrones (fallback local, estilos genéricos) que no coinciden con la intención; requieren revisión humana.
- **Integración con APIs reales:** El mapeo de datos del backend necesitó corrección manual cuando la respuesta REST no coincidía con los tipos asumidos.
- **CSS y UX fino:** Los detalles visuales precisos (tamaños, responsive, botones) fueron más confiables cuando se especificaron explícitamente.
- **Deuda técnica documentada:** Accesibilidad avanzada, E2E, persistencia del carrito y optimizaciones de producción quedaron como pendientes conscientes.

### Aprendizajes

1. **La guía (`PromptCreateNovaStore.md`) fue el ancla:** tener criterios por paso redujo deriva y facilitó verificar “cumple / pendiente”.
2. **Prompts pequeños > prompts gigantes:** corregir una imagen, un servicio o un componente por turno dio mejor control que pedir todo de una vez.
3. **Validar siempre:** lint, tests y build después de cada bloque evitaron acumular errores.
4. **La IA acelera, no sustituye criterio:** las decisiones de REST vs mock, eliminación de fallback y estructura documental fueron humanas; la IA ejecutó.

### Conclusión

La IA en Cursor funcionó como **copiloto de implementación**: generó código, tests y documentación a partir de una guía clara, mientras la desarrolladora definió arquitectura, validó integraciones, afinó UI y controló el historial Git. Para un proyecto de evaluación técnica con alcance acotado, el balance fue positivo siempre que cada entrega se revisara y se probara antes de integrarla.

---

## Referencias

- [PromptCreateNovaStore.md](./PromptCreateNovaStore.md) — Guía original del proyecto
- [NovaStoreChanges.md](./NovaStoreChanges.md) — Cambios implementados
- [decisiones.md](./decisiones.md) — Decisiones técnicas y tradeoffs
- [README.md](./README.md) — Setup y ejecución
