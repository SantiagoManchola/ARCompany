"use client";

import { useState, useRef } from "react";
import { newsItems } from "@/data/news";
import NewsCard from "./NewsCard";

export default function NewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Mostrar máximo 4 artículos
  const maxItems = Math.min(newsItems.length, 4);
  const displayItems = newsItems.slice(0, maxItems);

  const nextSlide = () => {
    if (currentSlide < displayItems.length - 1) {
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

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/85 via-white to-blue-50/90"></div>

      {/* Elementos decorativos */}
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float"></div>
      <div
        className="absolute top-10 right-5 w-40 h-40 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header mejorado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="relative">
              Trending
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
            </span>{" "}
            Today
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stay informed with our latest insights, case studies, and legal
            updates from our expert team
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white backdrop-blur-sm hover:bg-white text-black hover:text-amber-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-0 disabled:cursor-not-allowed flex items-center justify-center group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
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
            onClick={nextSlide}
            disabled={currentSlide === displayItems.length - 1}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white backdrop-blur-sm hover:bg-white text-black hover:text-amber-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-0 disabled:cursor-not-allowed flex items-center justify-center group"
          >
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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

          {/* Slider */}
          <div className="overflow-hidden mx-12 h-86">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentSlide * (320 + 24)}px)`,
              }}
            >
              {displayItems.map((item, index) => (
                <div key={item.id} className="flex-shrink-0">
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {displayItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-amber-500 w-8"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
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
