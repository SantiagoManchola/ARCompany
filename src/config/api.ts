// Configuración de la API
export const API_CONFIG = {
  BASE_URL: "https://ar-cms-cs94.onrender.com/api",
  TIMEOUT: 15000, 
  ENDPOINTS: {
    SERVICIOS: "/servicios",
    NOTICIAS: "/noticias",
    PROPIEDADES: "/propiedades", 
  },
} as const;

// Configuración de fallback
export const FALLBACK_CONFIG = {
  ENABLE_FALLBACK: false,
  FALLBACK_DATA_PATH: "@/data",
} as const;

// Configuración de caché (para implementación futura)
export const CACHE_CONFIG = {
  ENABLE_CACHE: false,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
} as const;