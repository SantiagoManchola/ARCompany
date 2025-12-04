"use client";

import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import NewsCard from "./NewsCard";
import { NewsData } from "@/types/api";

interface NewsSectionProps {
  news: NewsData[];
  loading: boolean;
  error: string | null;
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="relative py-20 px-2 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/85 via-white to-blue-50/90"></div>
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="relative">
              Mantente Informado
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
            </span>
          </h2>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Entérate de las principales novedades del ámbito legal 
          </p>
        </div>

        {children}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default function NewsSection({ news, loading, error }: NewsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1080) {
        setSlidesToShow(3); 
      } else if (window.innerWidth >= 663) {
        setSlidesToShow(2); 
      } else {
        setSlidesToShow(1);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  // Resetear slide actual cuando cambia slidesToShow
  useEffect(() => {
    setCurrentSlide(0);
  }, [slidesToShow]);

  // Calcular dimensiones responsivas
  const getCardDimensions = () => {
    if (slidesToShow === 1) {
      // Mobile: tarjeta mucho más pequeña para que quepa bien
      return { width: 250, height: 250, gap: 2 };
    } else if (slidesToShow === 2) {
      // Tablet: tarjeta mediana
      return { width: 300, height: 300, gap: 2 };
    } else {
      // Desktop: tarjeta grande
      return { width: 340, height: 320, gap: 2 };
    }
  };

  let content: ReactNode;
  if (loading || error) {
    content = (
      <div
        className="flex justify-center items-center min-h-[300px]"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
        <p className="ml-4 text-xl text-gray-600">Cargando noticias...</p>
      </div>
    );
  } else if (!news || news.length === 0) {
    content = (
      <div className="text-center" data-aos="fade-up" data-aos-delay="300">
        <p className="text-gray-600">No hay noticias disponibles en este momento.</p>
      </div>
    );
  } else {
    // Mostrar máximo 15 artículos
    const maxItems = Math.min(news.length, 15);
    const displayItems = news.slice(0, maxItems);

    // Calcular el número máximo de slides (número de posiciones posibles)
    const maxSlides = Math.max(0, displayItems.length - slidesToShow);

    const nextSlide = () => {
      if (currentSlide < maxSlides) {
        setCurrentSlide((prev) => prev + 1);
      }
    };

    const prevSlide = () => {
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    };

    const goToSlide = (index: number) => {
      setCurrentSlide(index);
    };

    const { width: cardWidth, height: cardHeight, gap } = getCardDimensions();
    const totalCardWidth = cardWidth + gap;

    const getContainerWidth = () => {
      return slidesToShow * cardWidth + (slidesToShow - 1) * gap;
    };

    content = (
      <div className="relative" data-aos="fade-up" data-aos-delay="300">
        {/* Navigation Buttons - visibles sólo cuando hay más elementos que mostrar */}
        {displayItems.length > slidesToShow && (
          <>
            {/* Flecha izquierda: desvanecer al inicio */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-hidden={currentSlide === 0}
              className={`absolute left-1 top-2/5 -translate-y-1/4 z-20 bg-white/95 text-black w-12 h-12 rounded-full shadow-lg transition-opacity duration-200 flex items-center justify-center hover:text-amber-600 group ${
                currentSlide === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flecha derecha: desvanecer al final */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === maxSlides}
              aria-hidden={currentSlide === maxSlides}
              className={`absolute right-1 top-2/5 -translate-y-1/4 z-20 bg-white/95 text-black w-12 h-12 rounded-full shadow-lg transition-opacity duration-200 flex items-center justify-center hover:text-amber-600 group ${
                currentSlide === maxSlides ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Slider */}
        <div className={`overflow-hidden ${slidesToShow === 1 ? "mx-8" : "mx-1"}`}>
          <div className="flex justify-center" style={{ width: "100%" }}>
            <div className="overflow-hidden" style={{ width: `${getContainerWidth()}px`, maxWidth: "100%" }}>
              <div
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-in-out sm:h-80 md:h-80 lg:h-86 h-67"
                style={{
                  transform: `translateX(-${currentSlide * totalCardWidth}px)`,
                  gap: `${gap}px`,
                  width: `${displayItems.length * totalCardWidth - gap}px`,
                }}
              >
                {displayItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0"
                    style={{ width: `${cardWidth}px` }}
                    data-aos="zoom-in"
                    data-aos-delay={500 + index * 100}
                    data-aos-duration="600"
                  >
                    <NewsCard item={item} width={cardWidth - 20} height={cardHeight} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation - Solo mostrar si hay más de un slide */}
        {maxSlides > 0 && (
          <div className="flex justify-center gap-2 mt-8" data-aos="fade-up" data-aos-delay="600">
            {Array.from({ length: maxSlides + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-amber-500 w-8" : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  
  return <Section>{content}</Section>;
}