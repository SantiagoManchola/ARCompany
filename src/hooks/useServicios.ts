"use client";

import { useState, useEffect } from "react";
import { ServiceAPI } from "@/types/api";
import { apiService, transformServicesToServiceData } from "@/services/api";

// Hook para obtener todos los servicios
export const useServicios = () => {
  const [servicios, setServicios] = useState<ServiceAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getServicios();
        setServicios(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        console.error("Error fetching servicios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  const servicesData = transformServicesToServiceData(servicios);

  return { servicios, servicesData, loading, error };
};

// Hook para obtener un servicio específico por slug
export const useServicioBySlug = (slug: string) => {
  const [servicio, setServicio] = useState<ServiceAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getServicioBySlug(slug);
        setServicio(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        console.error(`Error fetching servicio with slug ${slug}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchServicio();
    }
  }, [slug]);

  return { servicio, loading, error };
};
