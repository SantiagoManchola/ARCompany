// Tipos para la respuesta de servicios de la API
export interface ServiceAPI {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  descripcion_general: string;
  slug: string;
  descripcion: string;
  titulo_banner: string;
  descripcion_banner: string;
  imagen_banner: {
    createdAt: string;
    updatedAt: string;
    alt: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    focalX: number;
    focalY: number;
    id: string;
    url: string;
    thumbnailURL: string | null;
  };
  areas_especializacion: Array<{
    area: string;
    id: string;
  }>;
  icon?: {
    id: string;
    url: string;
    alt?: string;
    filename?: string;
    mimeType?: string;
    filesize?: number;
    width?: number;
    height?: number;
    thumbnailURL?: string | null;
  };
  title?: string;
  href?: string;
}

// Tipo para el formato actual de servicesData
export interface ServiceData {
  d: ServiceAPI;
  icon: string;
  title: string;
  description: string;
  descripcion_general: string;
  href: string;
}

// Tipo genérico para respuestas de la API
export interface APIResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
  error?: string;
}

// Tipo específico para la respuesta de servicios (respuesta directa de la API)
export interface ServiciosAPIResponse {
  docs: ServiceAPI[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Configuración de la API
export interface APIConfig {
  baseURL: string;
  timeout?: number;
}
