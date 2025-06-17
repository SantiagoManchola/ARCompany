"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { slides } from "@/data/slides";
import Link from "next/link";

export default function SliderSection() {
  return (
    <section className="relative h-190">
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
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
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
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Subtitle */}
                  <div
                    className="text-gray-200 text-lg md:text-xl mb-6 font-medium animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {slide.subtitle}
                  </div>

                  {/* Main Title */}
                  <h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up"
                    style={{ animationDelay: "0.4s" }}
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
                    className="text-gray-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      {slide.ctaText}
                      <svg
                        className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
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
          transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active {
          background: rgb(245, 179, 11) !important;
          transform: scale(1.2) !important;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
