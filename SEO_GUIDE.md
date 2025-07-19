# SEO Configuration Guide for AR Company

## ✅ Implementaciones de SEO realizadas:

### 1. **Server-Side Rendering (SSR)**

- Páginas de servicios renderizadas en el servidor
- Metadata dinámico basado en datos de la API
- Open Graph y Twitter Cards dinámicos

### 2. **Datos Estructurados (JSON-LD)**

- Schema.org para servicios legales
- Información de la organización
- Datos estructurados por servicio individual

### 3. **Sitemap Dinámico**

- Generación automática de sitemap con servicios de la API
- Actualización automática cuando se agregan nuevos servicios

### 4. **Robots.txt**

- Configuración optimizada para bots de búsqueda

## 🚀 Pasos para activar el SEO:

### 1. Configurar variables de entorno:

```bash
# Copia el archivo de ejemplo
cp .env.example .env.local

# Edita .env.local y configura:
NEXT_PUBLIC_BASE_URL=https://tu-dominio-real.com
```

### 2. Actualizar información de la empresa:

Edita `src/components/seo/OrganizationJsonLd.tsx` y actualiza:

- Teléfono de contacto
- Email de contacto
- Dirección física
- Redes sociales

### 3. Verificar el SEO:

#### Facebook Sharing Debugger:

1. Ve a: https://developers.facebook.com/tools/debug/
2. Ingresa la URL de cualquier servicio: `https://tu-dominio.com/services/propiedad-horizontal`
3. Verifica que muestre correctamente:
   - Título del servicio
   - Descripción
   - Imagen del banner

#### Google Rich Results Test:

1. Ve a: https://search.google.com/test/rich-results
2. Ingresa la URL de cualquier servicio
3. Verifica que detecte los datos estructurados

#### Google Search Console:

1. Sube el sitemap: `https://tu-dominio.com/sitemap.xml`
2. Solicita indexación de las páginas de servicios

## 🔍 URLs que se indexarán automáticamente:

- `/` (Homepage)
- `/about` (Acerca de)
- `/services` (Lista de servicios)
- `/services/[slug]` (Cada servicio individual)
- `/contact` (Contacto)
- `/real-state` (Bienes raíces)

## 📈 Beneficios implementados:

1. **Renderizado del servidor**: Los bots ven todo el contenido inmediatamente
2. **Metadata dinámico**: Cada servicio tiene su propio título, descripción e imagen
3. **Datos estructurados**: Google entiende mejor el contenido
4. **Sitemap automático**: Los nuevos servicios se indexan automáticamente
5. **Open Graph optimizado**: Compartir en redes sociales se ve profesional

## 🛠️ Monitoreo y mantenimiento:

1. **Google Search Console**: Monitorea el rendimiento de búsqueda
2. **Google Analytics**: Rastrea el tráfico orgánico
3. **Facebook Debugger**: Verifica el aspecto al compartir en redes sociales

## ⚠️ Importante:

- Los datos se cargan dinámicamente desde tu API en el servidor
- El SEO funciona tanto para contenido dinámico como estático
- Cada vez que agregues un nuevo servicio en tu CMS, automáticamente tendrá SEO optimizado
