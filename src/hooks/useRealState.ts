"use client";
import { useState, useEffect } from "react";
import { RealStateProperty } from "@/types/api";
import { apiService, transformPropiedadesToRealState, toRealStateProperty } from "@/services/api";

interface UseRealStateReturn {
  properties: RealStateProperty[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook personalizado para manejar propiedades de bienes raíces
 * Actualmente usa datos locales, pero está preparado para conectarse a una API
 * 
 * Para conectar a API:
 * 1. Reemplazar realStateProperties con fetch a tu endpoint
 * 2. Manejar estados de loading y error
 * 3. Ejemplo: const response = await fetch('/api/real-state')
 */
export function useRealState(): UseRealStateReturn {
  const [properties, setProperties] = useState<RealStateProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiList = await apiService.getPropiedades();
        const mapped = transformPropiedadesToRealState(apiList).sort(
          (a, b) => (b.precio ?? 0) - (a.precio ?? 0)
        );
        setProperties(mapped);
      } catch (err) {
        console.error("useRealState error:", err);
        // Sin fallback local: reportar error y limpiar lista
        setError(err instanceof Error ? err.message : "Error desconocido");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
}

/**
 * Hook para filtrar propiedades por operación
 */
export function useFilteredProperties(
  filter: "TODOS" | "VENTA" | "ARRIENDO"
): UseRealStateReturn {
  const { properties, loading, error } = useRealState();

  const filteredProperties = filter === "TODOS" 
    ? properties 
    : properties.filter(prop => prop.operacion === filter);

  return {
    properties: filteredProperties,
    loading,
    error
  };
}

// Hook para obtener una propiedad por slug
export function usePropertyBySlug(slug: string) {
  const [property, setProperty] = useState<RealStateProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const api = await apiService.getPropiedadBySlug(slug);
        if (!active) return;
        if (api) {
          // Mapear respuesta del CMS al shape de UI
          const mapped = toRealStateProperty(api);
          setProperty(mapped);
        } else {
          // Sin fallback local
          setProperty(null);
        }
      } catch (err) {
        console.error("usePropertyBySlug error:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [slug]);

  return { property, loading, error };
}
