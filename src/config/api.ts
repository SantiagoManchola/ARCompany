// Configuración de la API
export const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api",
  TIMEOUT: 15000, // 15 segundos
  ENDPOINTS: {
    SERVICIOS: "/servicios",
    PROPIEDADES: "/propiedades", // Para futuro uso
    // Agregar más endpoints aquí cuando sean necesarios
  },
} as const;

// Configuración de fallback
export const FALLBACK_CONFIG = {
  ENABLE_FALLBACK: true,
  FALLBACK_DATA_PATH: "@/data",
} as const;

// Configuración de caché (para implementación futura)
export const CACHE_CONFIG = {
  ENABLE_CACHE: false,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
} as const;
