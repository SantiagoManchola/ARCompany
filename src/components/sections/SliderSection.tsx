"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { slides } from "@/data/slides";
import Link from "next/link";
import { useRef, useState } from "react";
import type SwiperType from "swiper";

export default function SliderSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(-1);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <section className="relative h-[90vh] min-h-[600px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        simulateTouch={true}
        shortSwipes={true}
        longSwipes={true}
        longSwipesRatio={0.1}
        threshold={5}
        touchRatio={1.4}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="w-full h-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          requestAnimationFrame(() => {
            setCurrentSlide(swiper.realIndex);
          });
        }}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, slideIndex) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full px-4">
                <div className="text-center max-w-4xl mx-auto">
                  {/* Subtitle */}
                  {slide.subtitle && (
                    <div
                      className={`text-gray-200 text-base sm:text-lg md:text-xl mb-4 sm:mb-6 font-medium transition-all duration-800 ${
                        currentSlide === slideIndex
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-0 transform -translate-y-4"
                      }`}
                      style={{
                        transitionDelay:
                          currentSlide === slideIndex ? "200ms" : "0ms",
                      }}
                    >
                      {slide.subtitle}
                    </div>
                  )}

                  {/* Main Title */}
                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight transition-all duration-1200 ${
                      currentSlide === slideIndex
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4"
                    }`}
                    style={{
                      transitionDelay:
                        currentSlide === slideIndex ? "400ms" : "0ms",
                    }}
                  >
                    {slide.title.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className={word === "EJEMPLO" ? "text-amber-400" : ""}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </h1>

                  {/* Description */}
                  <p
                    className={`text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1200 ${
                      currentSlide === slideIndex
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4"
                    }`}
                    style={{
                      transitionDelay:
                        currentSlide === slideIndex ? "700ms" : "0ms",
                    }}
                  >
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div
                    className={`transform-gpu origin-center transition-all duration-1000 ease-out ${
                      currentSlide === slideIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-50"
                    }`}
                    style={{
                      transitionDelay:
                        currentSlide === slideIndex ? "1200ms" : "0ms",
                      willChange: "transform, opacity",
                    }}
                  >
                    <Link
                      href={slide.ctaLink}
                      className="group inline-flex items-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      {slide.ctaText}
                      <svg
                        className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 30px !important;
        }

        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease !important;
          transform: scale(1);
        }

        /* Hover only affects non-active bullets */
        .swiper-pagination-bullet:not(.swiper-pagination-bullet-active):hover {
          transform: scale(1.25);
          background: rgba(255, 255, 255, 0.5) !important;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.12);
        }

        .swiper-pagination-bullet-active {
          background: rgb(245, 179, 11) !important;
          /* Animate last with a noticeable delay after CTA */
          animation: bullet-pop 300ms ease-out both 150ms;
        }

        /* Keep active bullet style stable on hover */
        .swiper-pagination-bullet-active:hover {
          background: rgb(245, 179, 11) !important;
          box-shadow: none;
          cursor: default;
        }

        @keyframes bullet-pop {
          0% {
            transform: scale(1);
          }
          60% {
            transform: scale(1.35);
          }
          100% {
            transform: scale(1.2);
          }
        }

        /* Asegurar que el slider se vea bien en pantallas muy pequeñas */
        @media (max-height: 600px) {
          .text-3xl {
            font-size: 1.5rem;
          }
          .text-4xl {
            font-size: 1.75rem;
          }
          .text-5xl {
            font-size: 2rem;
          }
          .mb-8 {
            margin-bottom: 1rem;
          }
          .mb-12 {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
