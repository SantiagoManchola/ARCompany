// Tipos para la respuesta de servicios de la API
export interface ServiceAPI {
  id?: number;
  nombre: string;
  slug: string;
  descripcion: string;
  titulo_banner: string;
  descripcion_banner: string;
  imagen_banner: string;
  areas_especializacion: Array<{
    id: number;
    area: string;
  }>;
  icon?: string;
  title?: string;
  href?: string;
}

// Tipo para el formato actual de servicesData
export interface ServiceData {
  d: ServiceAPI;
  icon: string;
  title: string;
  description: string;
  href: string;
}

// Tipo genérico para respuestas de la API
export interface APIResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
  error?: string;
}

// Configuración de la API
export interface APIConfig {
  baseURL: string;
  timeout?: number;
}
