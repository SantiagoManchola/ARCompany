import { ServiceAPI, NewsAPI, APIConfig, ServiciosAPIResponse, NoticiasAPIResponse, PropertyAPI, PropiedadesAPIResponse, RealStateProperty } from "@/types/api";
import { API_CONFIG } from "@/config/api";

class APIService {
  private baseURL: string;
  private timeout: number;

  constructor(config: APIConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 10000;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Build URL and add cache-busting param for GET requests in production
    const urlObj = new URL(`${this.baseURL}${endpoint}`);
    const method = (options.method || "GET").toUpperCase();
    if (method === "GET" && process.env.NODE_ENV === "production") {
      urlObj.searchParams.set("_t", Date.now().toString());
    }
    const url = urlObj.toString();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout");
        }
        throw error;
      }

      throw new Error("Unknown error occurred");
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  // POST request
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // Métodos específicos para servicios
  async getServicios(): Promise<ServiceAPI[]> {
    try {
      // Solicitar a Payload ya ordenado por el campo "order" y con un límite alto
      // para preservar el orden configurado en el admin. Si el servidor no soporta
      // estos parámetros, más abajo aplicamos un sort defensivo en cliente.
  // En colecciones "orderable" de Payload, el campo real para ordenamiento es `_order` (string)
  // y el orden mostrado en el admin corresponde a sort descendente por `_order`.
  // Ejemplo: ?sort=-_order
  const query = `${API_CONFIG.ENDPOINTS.SERVICIOS}?sort=-_order&limit=100`;
      const response = await this.get<ServiciosAPIResponse>(query);

      if (response && Array.isArray(response.docs)) {
        return [...response.docs].sort((a, b) => {
          if (a?._order && b?._order) {
            return a._order > b._order ? -1 : a._order < b._order ? 1 : 0;
          }
          return 0;
        });
      }

      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Error fetching servicios:", error);
      throw error;
    }
  }

  async getServicioBySlug(slug: string): Promise<ServiceAPI | null> {
    try {
      const query = `${API_CONFIG.ENDPOINTS.SERVICIOS}?where[slug][equals]=${encodeURIComponent(
        slug
      )}&limit=1`;
      const response = await this.get<ServiciosAPIResponse>(query);
      if (response && Array.isArray(response.docs) && response.docs.length > 0) {
        return response.docs[0];
      }
      return null;
    } catch (error) {
      console.error(`Error fetching servicio with slug ${slug}:`, error);
      throw error;
    }
  }

  // Métodos específicos para noticias
  async getNoticias(): Promise<NewsAPI[]> {
    try {
      const response = await this.get<NoticiasAPIResponse>(
        API_CONFIG.ENDPOINTS.NOTICIAS
      );

      if (response && Array.isArray(response.docs)) {
        return response.docs;
      }

      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Error fetching noticias:", error);
      throw error;
    }
  }

  async getNoticiaBySlug(slug: string): Promise<NewsAPI | null> {
    try {
      const noticias = await this.getNoticias();
      return noticias.find((noticia) => noticia.slug === slug) || null;
    } catch (error) {
      console.error(`Error fetching noticia with slug ${slug}:`, error);
      throw error;
    }
  }

  // =========================
  // Propiedades (Bienes raíces)
  // =========================
  async getPropiedades(): Promise<PropertyAPI[]> {
    try {
      const query = `${API_CONFIG.ENDPOINTS.PROPIEDADES}?depth=2&limit=100`;
      const response = await this.get<PropiedadesAPIResponse | { docs?: PropertyAPI[] }>(query);
      const hasDocs = (val: unknown): val is { docs: PropertyAPI[] } =>
        !!val && typeof val === "object" && Array.isArray((val as { docs?: unknown }).docs);
      const docs = hasDocs(response) ? response.docs : [];
      return docs;
    } catch (error) {
      console.error("Error fetching propiedades:", error);
      throw error;
    }
  }

  async getPropiedadBySlug(slug: string): Promise<PropertyAPI | null> {
    try {
      // Buscar por slug si existe campo en el CMS
      const bySlug = `${API_CONFIG.ENDPOINTS.PROPIEDADES}?where[slug][equals]=${encodeURIComponent(
        slug
      )}&limit=1&depth=2`;
      const resp = await this.get<PropiedadesAPIResponse | { docs?: PropertyAPI[] }>(bySlug);
      const docs = ("docs" in resp && Array.isArray((resp as { docs?: unknown }).docs))
        ? (resp as { docs: PropertyAPI[] }).docs
        : [];
      if (docs.length > 0) return docs[0];

      // Fallback: aproximar por título
      const guessTitle = decodeURIComponent(slug.replace(/-/g, " "));
      const byTitle = `${API_CONFIG.ENDPOINTS.PROPIEDADES}?where[title][like]=${encodeURIComponent(
        guessTitle
      )}&limit=1&depth=2`;
      const resp2 = await this.get<PropiedadesAPIResponse | { docs?: PropertyAPI[] }>(byTitle);
      const docs2 = ("docs" in resp2 && Array.isArray((resp2 as { docs?: unknown }).docs))
        ? (resp2 as { docs: PropertyAPI[] }).docs
        : [];
      if (docs2.length > 0) return docs2[0];

      return null;
    } catch (error) {
      console.error(`Error fetching propiedad with slug ${slug}:`, error);
      throw error;
    }
  }
}

// Instancia singleton de la API
const apiConfig: APIConfig = {
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
};

export const apiService = new APIService(apiConfig);

// Funciones de utilidad para transformar datos de servicios
export const transformServiceToServiceData = (service: ServiceAPI) => ({
  icon: service.icon?.url || '',
  title: service.title || service.nombre || '',
  description: service.descripcion || '',
  descripcion_general: service.descripcion_general || '',
  href: `/services/${service.slug}`,
});

export const transformServicesToServiceData = (services: ServiceAPI[]) =>
  services.map(transformServiceToServiceData);

// Funciones de utilidad para transformar datos de noticias
export const transformNewsToNewsData = (news: NewsAPI) => ({
  id: news.id,
  title: news.title || '',
  description: news.description || '',
  backgroundImage: news.backgroundImage?.url || '',
  date: new Date(news.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }),
  link: `/news/${news.slug}`,
});

export const transformNoticiasToNewsData = (noticias: NewsAPI[]) => {
  if (!Array.isArray(noticias)) {
    return [];
  }
  return noticias.map(transformNewsToNewsData);
};

// =========================
// Transformadores de Propiedades -> RealStateProperty (UI)
// =========================

const slugify = (s?: string) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const toRealStateProperty = (p: PropertyAPI): RealStateProperty => {
  // Intentar capturar url de upload (Payload) o url directa
  const images = (p.images ?? []).map((it, idx) => {
    const up = it?.image;
    const url = up?.sizes?.card?.url || up?.url || it?.url || "";
    const alt = up?.alt || it?.alt || up?.filename || p.title || "Propiedad";
    return {
      id: up?.id || `img-${p.id}-${idx}`,
      url,
      alt,
      thumbnailURL: up?.sizes?.thumbnail?.url || undefined,
    };
  });

  const tipoRaw = (p.type ?? "CASA").toUpperCase();
  const opRaw = (p.operation ?? "VENTA").toUpperCase();
  const tipo: "CASA" | "APARTAMENTO" | "LOCAL" =
    tipoRaw === "APARTAMENTO" ? "APARTAMENTO" : tipoRaw === "LOCAL" ? "LOCAL" : "CASA";
  const operacion: "VENTA" | "ARRIENDO" = opRaw === "ARRIENDO" ? "ARRIENDO" : "VENTA";

  return {
    id: String(p.id),
    tipo,
    operacion,
    titulo: p.title || "Propiedad",
    descripcion: p.description || "",
    precio: typeof p.price === "number" ? p.price : 0,
    ciudad: p.city ?? p.location ?? "Bogotá",
    departamento: p.state ?? "Cundinamarca",
    barrio: p.neighborhood ?? undefined,
    direccion: p.address ?? undefined,
    area: p.area ?? 0,
    alcobas: p.rooms ?? 0,
    banos: p.bathrooms ?? 0,
    garajes: p.garages ?? 0,
    estrato: p.estrato ?? undefined,
    antiguedad: p.years ?? undefined,
    piso: p.floor ?? undefined,
    pisos: p.floors ?? undefined,
    administracion: p.adminFee ?? undefined,
    imagenes: images.length > 0 ? images : [
      {
        id: `img-${p.id}-0`,
        url: "/images/propiedades/placeholder.jpg",
        alt: "Imagen no disponible",
      },
    ],
    caracteristicas: Array.isArray(p.features)
      ? (p.features as Array<string | { feature?: string }>)
          .map((it) => (typeof it === "string" ? it : it?.feature || ""))
          .filter(Boolean)
      : [],
    slug: p.slug || slugify(p.title),
    destacado: p.highlighted ?? false,
    // Forzar estado disponible para todas las propiedades
    estado: "DISPONIBLE",
    createdAt: p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt || new Date().toISOString(),
  };
};

export const transformPropiedadesToRealState = (props: PropertyAPI[]): RealStateProperty[] =>
  props.map(toRealStateProperty);