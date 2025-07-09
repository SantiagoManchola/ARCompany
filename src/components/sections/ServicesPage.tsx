"use client";
import { useState } from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";

export default function ServicesPageSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-amber-500 text-sm font-medium mb-6">
            <div className="w-12 h-px bg-amber-500"></div>
            <span className="uppercase tracking-wider">NUESTROS SERVICIOS</span>
            <div className="w-12 h-px bg-amber-500"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Soluciones jurídicas{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text">
                especializadas
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Nuestro equipo está comprometido con la excelencia y resultados efectivos
          </p>
        </div>

        {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card Background with advanced effects */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 border border-gray-200 group-hover:border-amber-400/50"></div>
                
                <Link
                  href={service.href}
                  className="relative p-8 lg:p-10 h-full flex flex-col block cursor-pointer"
                >

                {/* Content */}
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400/20 to-amber-500/10 rounded-2xl flex items-center justify-center group-hover:from-amber-400/30 group-hover:to-amber-400/20 transition-all duration-300">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    
                    {/* Animated border */}
                    <div className="absolute -top-1 -left-1 w-22 h-22 border-2 border-amber-400/0 group-hover:border-amber-400/30 rounded-2xl transition-all duration-300 transform group-hover:scale-110"></div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-500 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>

                  {/* CTA Link */}
                  <div className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-600 transition-colors duration-300 group-hover:gap-3">
                    <span>Más información</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-amber-400/20 group-hover:border-amber-400/50 transition-colors duration-300"></div>
                </Link>
              </div>
            ))}
          </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            ¿Por qué elegir{" "}
            <span className="text-amber-400">nuestros servicios?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="group">
              <div className="w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Experiencia Comprobada</h3>
              <p className="text-gray-300">Más de 5 años de experiencia en casos exitosos</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Atención Personalizada</h3>
              <p className="text-gray-300">Cada caso recibe atención dedicada y especializada</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Resultados Rápidos</h3>
              <p className="text-gray-300">Soluciones eficientes y tiempos de respuesta optimizados</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span>Solicitar Consulta</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}