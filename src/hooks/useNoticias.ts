"use client";

import { useState, useEffect, useMemo } from "react";
import { NewsAPI } from "@/types/api";
import { apiService, transformNoticiasToNewsData } from "@/services/api";

// Hook para obtener todas las noticias
export const useNoticias = () => {
  const [noticias, setNoticias] = useState<NewsAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getNoticias();
        setNoticias(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        console.error("Error fetching noticias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  // Usar useMemo para evitar recalcular newsData en cada render
  const newsData = useMemo(() => {
    return transformNoticiasToNewsData(noticias);
  }, [noticias]);

  return { noticias, newsData, loading, error };
};

// Hook para obtener una noticia específica por slug
export const useNoticiaBySlug = (slug: string) => {
  const [noticia, setNoticia] = useState<NewsAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getNoticiaBySlug(slug);
        setNoticia(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        console.error(`Error fetching noticia with slug ${slug}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNoticia();
    }
  }, [slug]);

  return { noticia, loading, error };
};