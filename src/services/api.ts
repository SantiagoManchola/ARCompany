import { ServiceAPI, APIConfig, ServiciosAPIResponse } from "@/types/api";
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
    const url = `${this.baseURL}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
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
      const response = await this.get<ServiciosAPIResponse>(
        API_CONFIG.ENDPOINTS.SERVICIOS
      );

      if (response && Array.isArray(response.docs)) {
        return response.docs;
      }

      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Error fetching servicios:", error);
      throw error;
    }
  }

  async getServicioBySlug(slug: string): Promise<ServiceAPI | null> {
    try {
      const servicios = await this.getServicios();
      return servicios.find((servicio) => servicio.slug === slug) || null;
    } catch (error) {
      console.error(`Error fetching servicio with slug ${slug}:`, error);
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

// Funciones de utilidad para transformar datos
export const transformServiceToServiceData = (service: ServiceAPI) => ({
  icon: service.icon?.url,
  title: service.title || service.nombre,
  description: service.descripcion,
  descripcion_general: service.descripcion_general,
  href: `/services/${service.slug}`,
});

export const transformServicesToServiceData = (services: ServiceAPI[]) =>
  services.map(transformServiceToServiceData);
