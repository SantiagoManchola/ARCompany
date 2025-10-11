# Bienes Raíces - Integración con API

## 📁 Estructura de Archivos

```
src/
├── types/api.ts                    # Tipos TypeScript (RealStateProperty)
├── data/realState.ts               # Datos de ejemplo (TEMPORAL)
├── hooks/useRealState.ts           # Hook para consumir API
├── components/sections/
│   ├── RealStateBanner.tsx         # Banner de la página
│   └── RealStateSale.tsx           # Grid de propiedades
└── app/bienes-raices/page.tsx      # Página principal
```

## 🎨 Características Implementadas

✅ Diseño responsive y elegante con colores del sitio (amber/slate)  
✅ Filtros por tipo de operación (Todos, Venta, Arriendo)  
✅ Grid adaptable (1-4 columnas según pantalla)  
✅ Animaciones con AOS  
✅ Badges para tipo y operación  
✅ Iconos para características (alcobas, baños, garajes, área)  
✅ Formato de precio en pesos colombianos  
✅ Estado vacío cuando no hay propiedades  
✅ CTA para contacto  
✅ Preparado para imágenes (placeholder si no existen)

## 🔌 Cómo Conectar a tu API

### 1. Endpoint de API

Tu API debe retornar un array de propiedades con esta estructura:

```typescript
interface RealStateProperty {
  id: string;
  tipo: "CASA" | "APARTAMENTO" | "LOCAL" | "OFICINA" | "LOTE" | "FINCA";
  operacion: "VENTA" | "ARRIENDO";
  titulo: string;
  descripcion: string;
  precio: number;
  ciudad: string;
  departamento: string;
  barrio?: string;
  direccion?: string;
  area: number;
  alcobas: number;
  banos: number;
  garajes: number;
  estrato?: number;
  antiguedad?: number;
  piso?: number;
  administracion?: number;
  imagenes: Array<{
    id: string;
    url: string;
    alt: string;
    thumbnailURL?: string;
  }>;
  caracteristicas?: string[];
  slug: string;
  destacado?: boolean;
  estado?: "DISPONIBLE" | "RESERVADO" | "VENDIDO" | "ARRENDADO";
  createdAt: string;
  updatedAt: string;
}
```

### 2. Crear API Route en Next.js

Crea el archivo `src/app/api/real-state/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Reemplaza con tu URL de API
    const response = await fetch('https://tu-api.com/api/propiedades', {
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache por 1 hora
    });

    if (!response.ok) {
      throw new Error('Error al obtener propiedades');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al cargar propiedades' },
      { status: 500 }
    );
  }
}
```

### 3. Actualizar el Hook

En `src/hooks/useRealState.ts`, reemplaza estas líneas:

```typescript
// ANTES (líneas 26-33)
await new Promise(resolve => setTimeout(resolve, 500));
setProperties(realStateProperties);

// DESPUÉS
const response = await fetch('/api/real-state');
if (!response.ok) throw new Error('Error al cargar propiedades');
const data = await response.json();
setProperties(data);
```

### 4. Eliminar Datos de Ejemplo

Una vez conectada la API, puedes eliminar:
- `src/data/realState.ts` (datos de ejemplo)

## 📸 Imágenes

Las imágenes deben estar en:
```
public/images/propiedades/
├── casa-villa-mayor.jpg
├── apartamento-madrid.jpg
├── casa-catalina.jpg
└── ...
```

O usar URLs absolutas desde tu servidor/CDN.

## 🎯 Variables de Entorno

Crea `.env.local`:

```env
# API de Bienes Raíces
NEXT_PUBLIC_API_URL=https://tu-api.com
API_TOKEN=tu_token_secreto
```

## 🚀 Uso del Componente

El componente ya está integrado en `/bienes-raices`. Para usarlo en otra página:

```tsx
import RealStateSale from "@/components/sections/RealStateSale";

export default function MiPagina() {
  return <RealStateSale />;
}
```

## 📝 Personalización

### Cambiar cantidad de columnas

En `RealStateSale.tsx`, línea 77:
```tsx
// Actual: 1-2-3-4 columnas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Alternativa: 1-2-3 columnas (más grandes)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### Agregar más filtros

Puedes agregar filtros por tipo, ciudad, rango de precio, etc. modificando el estado y la lógica de filtrado.

## 🐛 Troubleshooting

**Imágenes no se ven:**
- Verifica que las rutas sean correctas
- Agrega el dominio en `next.config.ts` si son externas
- Revisa la consola del navegador

**Error de tipos:**
- Asegúrate que tu API retorne exactamente la estructura de `RealStateProperty`
- O adapta los tipos en `src/types/api.ts` según tu API

**Datos no se actualizan:**
- Verifica el cache en el API route (`revalidate`)
- Revisa los logs de la consola del servidor

## 📞 Soporte

Para más opciones de texto del banner, revisa las 6 alternativas proporcionadas anteriormente.
