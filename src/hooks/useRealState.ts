import { useState, useEffect } from "react";
import { RealStateProperty } from "@/types/api";
import { realStateProperties } from "@/data/realState";

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
        
        // TODO: Reemplazar con llamado real a API
        // const response = await fetch('/api/real-state');
        // if (!response.ok) throw new Error('Error al cargar propiedades');
        // const data = await response.json();
        // setProperties(data);
        
        // Simulación de delay de API (remover en producción)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Usar datos locales temporalmente
        setProperties(realStateProperties);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
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
