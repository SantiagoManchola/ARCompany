"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePropertyBySlug } from "@/hooks/useRealState";

// Segment options se declaran en el layout (Server Component)

function ThumbImg({
  srcPrimary,
  fallbackSrc,
  alt,
}: {
  srcPrimary?: string;
  fallbackSrc: string;
  alt: string;
}) {
  const [src, setSrc] = useState<string>(
    srcPrimary && srcPrimary.trim() !== "" ? srcPrimary : fallbackSrc
  );
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="80px"
      className="object-cover bg-white"
      loading="lazy"
      onError={() => {
        if (src !== fallbackSrc) setSrc(fallbackSrc);
      }}
    />
  );
}

export default function PropertyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { property, loading, error } = usePropertyBySlug(slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // Small enter animation for the lightbox
  const [lbVisible, setLbVisible] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    moved?: boolean;
  } | null>(null);
  const justPannedRef = useRef(false);
  const lightboxContainerRef = useRef<HTMLDivElement | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const thumbsContainerRef = useRef<HTMLDivElement | null>(null);
  const imagesCount = property?.imagenes?.length ?? 0;

  // Nota: no retornamos temprano antes de declarar hooks; las comprobaciones se hacen justo antes del render.

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < imagesCount - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setIsPanning(false);
    panStartRef.current = null;
  };

  // Responsive helper for lightbox spacing (only small screens)
  const isSmallScreen =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;
  const slideGapPx = isSmallScreen ? 8 : 0;

  // Mantener centrada en el carrusel de miniaturas la imagen activa
  useEffect(() => {
    const el = thumbRefs.current[currentImageIndex];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentImageIndex]);

  // Reset zoom on image change while lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setIsPanning(false);
      panStartRef.current = null;
    }
  }, [currentImageIndex, isLightboxOpen]);

  // Trigger enter animation once the lightbox mounts
  useEffect(() => {
    if (isLightboxOpen) {
      setLbVisible(false);
      const id = requestAnimationFrame(() => setLbVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setLbVisible(false);
    }
  }, [isLightboxOpen]);

  // Disable body scroll when lightbox open and keyboard navigation
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    const onKey = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
          prev < imagesCount - 1 ? prev + 1 : prev
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isLightboxOpen, imagesCount]);

  // Pan handlers
  const onLBMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: offset.x,
      startY: offset.y,
      moved: false,
    };
  };
  const onLBMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isPanning || !panStartRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    if (!panStartRef.current.moved && Math.hypot(dx, dy) > 5) {
      panStartRef.current.moved = true;
    }
    const container = lightboxContainerRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const maxX = (zoom - 1) * (cw / 2);
    const maxY = (zoom - 1) * (ch / 2);
    const nextX = Math.max(
      -maxX,
      Math.min(maxX, panStartRef.current.startX + dx)
    );
    const nextY = Math.max(
      -maxY,
      Math.min(maxY, panStartRef.current.startY + dy)
    );
    setOffset({ x: nextX, y: nextY });
  };
  const endPan = () => {
    if (panStartRef.current?.moved) {
      // Mark that we just panned to prevent the subsequent click from toggling zoom
      justPannedRef.current = true;
      setTimeout(() => {
        justPannedRef.current = false;
      }, 100);
    }
    setIsPanning(false);
    panStartRef.current = null;
  };

  // Touch pan handlers (mobile)
  const onLBTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (zoom <= 1) return;
    const t = e.touches[0];
    if (!t) return;
    setIsPanning(true);
    panStartRef.current = {
      x: t.clientX,
      y: t.clientY,
      startX: offset.x,
      startY: offset.y,
      moved: false,
    };
  };
  const onLBTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isPanning || !panStartRef.current) return;
    const t = e.touches[0];
    if (!t) return;
    const dx = t.clientX - panStartRef.current.x;
    const dy = t.clientY - panStartRef.current.y;
    if (!panStartRef.current.moved && Math.hypot(dx, dy) > 5) {
      panStartRef.current.moved = true;
    }
    const container = lightboxContainerRef.current;
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const maxX = (zoom - 1) * (cw / 2);
    const maxY = (zoom - 1) * (ch / 2);
    const nextX = Math.max(
      -maxX,
      Math.min(maxX, panStartRef.current.startX + dx)
    );
    const nextY = Math.max(
      -maxY,
      Math.min(maxY, panStartRef.current.startY + dy)
    );
    setOffset({ x: nextX, y: nextY });
    // Prevent page scroll/bounce while panning
    e.preventDefault();
  };
  const onLBTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    endPan();
  };

  // Single click to toggle zoom (guarded to avoid triggering after a pan)
  const onLBClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    // Ignore click if we just panned
    if (justPannedRef.current) {
      justPannedRef.current = false;
      return;
    }
    const container = lightboxContainerRef.current;
    if (!container) return;
    if (zoom === 1) {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const targetZoom = 2.5;
      const cw = rect.width;
      const ch = rect.height;
      const maxX = (targetZoom - 1) * (cw / 2);
      const maxY = (targetZoom - 1) * (ch / 2);
      const newX = Math.max(-maxX, Math.min(maxX, -dx));
      const newY = Math.max(-maxY, Math.min(maxY, -dy));
      setZoom(targetZoom);
      setOffset({ x: newX, y: newY });
    } else {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white grid place-items-center">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
          Cargando propiedad...
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white grid place-items-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Propiedad no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            Es posible que el enlace haya cambiado o que la propiedad haya sido eliminada.
          </p>
          <Link
            href="/bienes-raices"
            className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Volver a propiedades
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-8">
        {/* Título y Ubicación */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {property.titulo}
                </h1>
                <div className="flex items-center text-gray-600 text-lg">
                  <svg
                    className="w-5 h-5 mr-2 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {property.barrio && `${property.barrio}, `}
                    {property.ciudad}, {property.departamento}
                  </span>
                </div>
                {property.direccion && (
                  <p className="text-gray-500 mt-1">{property.direccion}</p>
                )}
              </div>
              <span className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium text-sm">
                {property.tipo}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal - Imágenes y Descripción */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galería de Imágenes */}
            <div className="rounded-xl overflow-hidden">
              <div
                className="relative h-96 md:h-[500px] bg-gray-200 rounded-2xl overflow-hidden cursor-zoom-in"
                onClick={() => openLightbox()}
              >
                {property.imagenes && property.imagenes.length > 0 ? (
                  <>
                    {property.imagenes.map((img, index) => (
                      <div
                        key={`${img.id}-${index}`}
                        className="absolute top-0 bottom-0 left-[-1px] right-[-1px] transition-transform duration-500 ease-in-out [will-change:transform] pointer-events-none overflow-hidden"
                        style={{
                          transform: `translateX(${(index - currentImageIndex) * 100}%)`,
                        }}
                        aria-hidden={index !== currentImageIndex}
                      >
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          className="object-cover rounded-2xl"
                          priority={index === currentImageIndex}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-300 to-gray-400">
                    <svg
                      className="w-24 h-24 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                )}

                {/* Badge de Operación */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                      property.operacion === "VENTA"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                    }`}
                  >
                    {property.operacion}
                  </span>
                </div>

                {/* Controles de Navegación */}
                {property.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-10 ${
                        currentImageIndex > 0
                          ? "opacity-100 cursor-pointer pointer-events-auto"
                          : "opacity-0 cursor-default pointer-events-none"
                      }`}
                      aria-label="Imagen anterior"
                      aria-hidden={currentImageIndex <= 0}
                      tabIndex={currentImageIndex > 0 ? 0 : -1}
                      disabled={currentImageIndex <= 0}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-10 ${
                        currentImageIndex < property.imagenes.length - 1
                          ? "opacity-100 cursor-pointer pointer-events-auto"
                          : "opacity-0 cursor-default pointer-events-none"
                      }`}
                      aria-label="Siguiente imagen"
                      aria-hidden={
                        currentImageIndex >= property.imagenes.length - 1
                      }
                      tabIndex={
                        currentImageIndex < property.imagenes.length - 1
                          ? 0
                          : -1
                      }
                      disabled={
                        currentImageIndex >= property.imagenes.length - 1
                      }
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Contador de imágenes */}
                {property.imagenes.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.imagenes.length}
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {property.imagenes.length > 1 && (
                <div
                  ref={thumbsContainerRef}
                  className="py-4 px-1 flex gap-2 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                >
                  {property.imagenes.map((img, index) => (
                    <button
                      key={`${img.id}-${index}`}
                      ref={(el) => {
                        thumbRefs.current[index] = el;
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 aspect-square flex-shrink-0 rounded-md overflow-hidden border bg-white transition-all snap-center ${
                        index === currentImageIndex
                          ? "ring-2 ring-amber-500 border-amber-400"
                          : "opacity-70 hover:opacity-100 border-gray-200 cursor-pointer"
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    >
                      <ThumbImg
                        srcPrimary={img.thumbnailURL}
                        fallbackSrc={img.url}
                        alt={img.alt}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen &&
              typeof window !== "undefined" &&
              createPortal(
                <div
                  className={`fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm md:backdrop-blur-md backdrop-brightness-110 transition-opacity duration-300 ${lbVisible ? "opacity-100" : "opacity-0"}`}
                  style={{ minHeight: "100dvh" }}
                  onClick={closeLightbox}
                >
                  {/* Header info */}
                  <div className="absolute top-4 left-4 text-white space-y-1 select-none">
                    <div className="text-lg md:text-2xl font-semibold drop-shadow">
                      {property.titulo}
                    </div>
                    <div className="text-sm md:text-xl text-gray-100 drop-shadow">
                      {formatPrice(property.precio)}
                      {property.administracion && (
                        <>
                          {" "}
                          +
                          <span className="opacity-90">
                            + {formatPrice(property.administracion)}{" "}
                            administración
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeLightbox();
                    }}
                    aria-label="Cerrar"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 w-9 h-9 rounded-full shadow-lg flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Main viewer */}
                  <div
                    className="w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      ref={lightboxContainerRef}
                      className={`relative w-[92vw] h-[80vh] md:w-[80vw] md:h-[80vh] ${zoom > 1 ? "rounded-none" : "rounded-2xl"} overflow-hidden transition-all duration-300 ease-out ${lbVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-1"} ${zoom > 1 ? `touch-none select-none ${isPanning ? "cursor-grabbing" : "cursor-grab"}` : "touch-auto cursor-zoom-in"}`}
                      onMouseDown={onLBMouseDown}
                      onMouseMove={onLBMouseMove}
                      onMouseUp={endPan}
                      onMouseLeave={endPan}
                      onClick={onLBClick}
                      onTouchStart={onLBTouchStart}
                      onTouchMove={onLBTouchMove}
                      onTouchEnd={onLBTouchEnd}
                      onTouchCancel={onLBTouchEnd}
                    >
                      {property.imagenes.map((img, index) => {
                        // When zoomed-in, render only the active slide to avoid neighbors bleeding in
                        if (zoom > 1 && index !== currentImageIndex)
                          return null;
                        return (
                          <div
                            key={`lb-${img.id}-${index}`}
                            className="absolute top-0 bottom-0 left-[-1px] right-[-1px] transition-transform duration-500 ease-in-out [will-change:transform] bg-transparent"
                            style={{
                              transform: slideGapPx
                                ? `translateX(calc(${(index - currentImageIndex) * 100}% + ${(index - currentImageIndex) * slideGapPx}px))`
                                : `translateX(${(index - currentImageIndex) * 100}%)`,
                            }}
                            aria-hidden={index !== currentImageIndex}
                          >
                            <div className="absolute inset-0">
                              <div
                                className="absolute inset-0"
                                style={{
                                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${index === currentImageIndex ? zoom : 1})`,
                                  transition: isPanning
                                    ? "none"
                                    : "transform 200ms ease-out",
                                  transformOrigin: "center center",
                                }}
                              >
                                <Image
                                  src={img.url}
                                  alt={img.alt}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Lightbox navigation */}
                      {property.imagenes.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (zoom <= 1) prevImage();
                            }}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-14 rounded-full shadow-lg transition-opacity duration-300 flex items-center justify-center z-10 ${
                              currentImageIndex > 0 && zoom <= 1
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                            }`}
                            aria-label="Imagen anterior"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (zoom <= 1) nextImage();
                            }}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-14 rounded-full shadow-lg transition-opacity duration-300 flex items-center justify-center z-10 ${
                              currentImageIndex <
                                property.imagenes.length - 1 && zoom <= 1
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                            }`}
                            aria-label="Siguiente imagen"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </>
                      )}

                      {/* Counter */}
                      {property.imagenes.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                          {currentImageIndex + 1} / {property.imagenes.length}
                        </div>
                      )}
                    </div>
                  </div>
                </div>,
                document.body
              )}

            {/* Características Principales */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Características
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Tipo */}
                {property.tipo && (
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      className="w-8 h-8 text-amber-500 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      {property.tipo === "APARTAMENTO" ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 21h18M6 21V7a2 2 0 012-2h8a2 2 0 012 2v14M9 10h.01M9 14h.01M15 10h.01M15 14h.01"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10l9-7 9 7v9a2 2 0 01-2 2h-4a2 2 0 01-2-2v-5H9v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z"
                        />
                      )}
                    </svg>
                    <span className="text-2xl font-bold text-gray-900">
                      {(() => {
                        switch (property.tipo) {
                          case "CASA":
                            return "Casa";
                          case "APARTAMENTO":
                            return "Apartamento";
                          case "LOCAL":
                            return "Local";
                          default:
                            return property.tipo;
                        }
                      })()}
                    </span>
                    <span className="text-sm text-gray-600">Tipo</span>
                  </div>
                )}

                {/* Habitaciones */}
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <svg
                    className="w-8 h-8 text-amber-500 mb-2"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
                  </svg>
                  <span className="text-2xl font-bold text-gray-900">
                    {property.alcobas}
                  </span>
                  <span className="text-sm text-gray-600">Habitaciones</span>
                </div>

                {/* Baños */}
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <svg
                    className="w-8 h-8 text-amber-500 mb-2"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64 131.9C64 112.1 80.1 96 99.9 96c9.5 0 18.6 3.8 25.4 10.5l16.2 16.2c-21 38.9-17.4 87.5 10.9 123L151 247c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L345 121c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-1.3 1.3c-35.5-28.3-84.2-31.9-123-10.9L170.5 61.3C151.8 42.5 126.4 32 99.9 32C44.7 32 0 76.7 0 131.9V448c0 17.7 14.3 32 32 32s32-14.3 32-32V131.9zM256 352a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32-32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                  </svg>
                  <span className="text-2xl font-bold text-gray-900">
                    {property.banos}
                  </span>
                  <span className="text-sm text-gray-600">Baños</span>
                </div>

                {/* Área */}
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <svg
                    className="w-8 h-8 text-amber-500 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  <span className="text-2xl font-bold text-gray-900">
                    {property.area}
                  </span>
                  <span className="text-sm text-gray-600">m²</span>
                </div>

                {/* Garajes */}
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <svg
                    className="w-8 h-8 text-amber-500 mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.772 10.156l-1.368-4.105A2.995 2.995 0 0016.559 4H7.441a2.995 2.995 0 00-2.845 2.051l-1.368 4.105A2.003 2.003 0 002 12v5c0 .753.423 1.402 1.039 1.743-.013.066-.039.126-.039.195V21a1 1 0 001 1h1a1 1 0 001-1v-2h12v2a1 1 0 001 1h1a1 1 0 001-1v-2.062c0-.069-.026-.13-.039-.195A1.993 1.993 0 0022 17v-5c0-.829-.508-1.541-1.228-1.844zM4 17v-5h16l.002 5H4zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 017.441 6z" />
                    <circle cx="6.5" cy="14.5" r="1.5" />
                    <circle cx="17.5" cy="14.5" r="1.5" />
                  </svg>
                  <span className="text-2xl font-bold text-gray-900">
                    {property.garajes}
                  </span>
                  <span className="text-sm text-gray-600">Garajes</span>
                </div>

                {/* Piso/Pisos */}
                {property.tipo === "APARTAMENTO" && property.piso && (
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      className="w-8 h-8 text-amber-500 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 20h16M6 16h4v-3h4v-3h4V6"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-gray-900">
                      {property.piso}
                    </span>
                    <span className="text-sm text-gray-600">Piso</span>
                  </div>
                )}
                {property.tipo === "CASA" && (
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      className="w-8 h-8 text-amber-500 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 20h16M6 16h4v-3h4v-3h4V6"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-gray-900">
                      {property.pisos ??
                        (() => {
                          const text = (property.caracteristicas || [])
                            .join(" ")
                            .toLowerCase();
                          const m = text.match(
                            /(\d+)\s+(planta|plantas|piso|pisos|nivel|niveles)/i
                          );
                          if (m) {
                            const n = parseInt(m[1], 10);
                            if (!Number.isNaN(n)) return n;
                          }
                          if (text.includes("dos plantas")) return 2;
                          return 1;
                        })()}
                    </span>
                    <span className="text-sm text-gray-600">Pisos</span>
                  </div>
                )}

                {/* Estrato */}
                {property.estrato && (
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      className="w-8 h-8 text-amber-500 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <polygon
                        points="12 2 2 7 12 12 22 7 12 2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="2 12 12 17 22 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="2 17 12 22 22 17"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-gray-900">
                      {property.estrato}
                    </span>
                    <span className="text-sm text-gray-600">Estrato</span>
                  </div>
                )}

                {/* Antigüedad */}
                {property.antiguedad && (
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      className="w-8 h-8 text-amber-500 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-gray-900">
                      {property.antiguedad}
                    </span>
                    <span className="text-sm text-gray-600">Años</span>
                  </div>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Descripción
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.descripcion}
              </p>
            </div>

            {/* Características Detalladas */}
            {property.caracteristicas &&
              property.caracteristicas.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Características Adicionales
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.caracteristicas.map((caracteristica, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Columna Lateral - Precio y Contacto */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Card de Precio */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">
                    Precio de{" "}
                    {property.operacion === "VENTA" ? "Venta" : "Arriendo"}
                  </p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                    {formatPrice(property.precio)}
                  </p>
                  {property.administracion && (
                    <p className="text-sm text-gray-600 mt-2">
                      + {formatPrice(property.administracion)} administración
                    </p>
                  )}
                </div>

                {/* Estado */}
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      property.estado === "DISPONIBLE"
                        ? "bg-green-100 text-green-800"
                        : property.estado === "RESERVADO"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {property.estado}
                  </span>
                </div>

                {/* Botón de Contacto */}
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-3"
                >
                  Me interesa esta propiedad
                </button>

                {/* Botón de WhatsApp */}
                <a
                  href={`https://wa.me/573123456789?text=Hola, estoy interesado en la propiedad: ${property.titulo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Contactar por WhatsApp
                </a>
              </div>

              {/* Formulario de Contacto */}
              {showContactForm && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Solicitar Información
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="tu@correo.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="300 123 4567"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Cuéntanos qué necesitas..."
                        defaultValue={`Estoy interesado en: ${property.titulo}`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      Enviar solicitud
                    </button>
                  </form>
                </div>
              )}

              {/* Info de Contacto Rápido */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  ¿Necesitas ayuda?
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-amber-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="font-medium">+57 312 345 6789</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-amber-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">info@arcompany.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Volver */}
        <div className="mt-12">
          <Link
            href="/bienes-raices"
            className="inline-flex items-center text-gray-600 hover:text-amber-500 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver a propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}
