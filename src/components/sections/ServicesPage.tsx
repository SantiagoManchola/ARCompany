"use client";
import Link from "next/link";
import Image from "next/image";
import { useServicios } from "@/hooks/useServicios";

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return (
      string.startsWith("/") ||
      string.startsWith("./") ||
      string.startsWith("../")
    );
  }
}

export default function ServicesPageSection() {
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
            Nuestro equipo está comprometido con la excelencia y resultados
            efectivos
          </p>
        </div>

        {/* Services Grid (solo carga los servicios) */}
        <ServicesGrid />

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            ¿Por qué elegir{" "}
            <span className="text-amber-400">nuestros servicios?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="group">
              <div className="w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Experiencia Comprobada
              </h3>
              <p className="text-gray-300">
                Más de 5 años de experiencia en casos exitosos
              </p>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Atención Personalizada
              </h3>
              <p className="text-gray-300">
                Cada caso recibe atención dedicada y especializada
              </p>
            </div>

            <div className="group">
              <div className="w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Resultados Rápidos
              </h3>
              <p className="text-gray-300">
                Soluciones eficientes y tiempos de respuesta optimizados
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span>Solicitar Consulta</span>
            <svg
              className="w-5 h-5"
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
    </section>
  );
}

function ServicesGrid() {
  const { servicesData, loading, error } = useServicios();

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
        <p className="mt-6 text-xl text-gray-600">Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[200px]">
        <div className="text-red-500 mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Error al cargar los servicios
        </h3>
        <p className="text-gray-600">
          Por favor, intenta nuevamente más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {servicesData.map((service, index) => (
        <div key={index} className="group relative">
          {/* Card Background with advanced effects */}
          <div className="absolute inset-0 bg-white rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 border border-gray-200 group-hover:border-amber-400"></div>

          <Link
            href={service.href}
            className="relative p-8 lg:p-10 h-full flex flex-col block cursor-pointer"
          >
            {/* Content */}
            {/* Icon Container */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400/20 to-amber-500/10 rounded-2xl flex items-center justify-center group-hover:from-amber-400/30 group-hover:to-amber-400/20 transition-all duration-300">
                {service.icon && isValidUrl(service.icon) ? (
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={40}
                    height={40}
                    className="object-contain filter brightness-0 hue-rotate-20 saturate-200 opacity-80 group-hover:opacity-100 group-hover:sepia-0 group-hover:hue-rotate-0 group-hover:saturate-100 scale-120 transition-all duration-300 transform group-hover:scale-130"
                    onError={(e) => {
                      console.error(`Error loading image: ${service.icon}`);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Animated border */}
              <div className="absolute -top-1 -left-1 w-22 h-22 border-2 border-amber-400/0 group-hover:border-amber-400/30 rounded-2xl transition-all duration-300 transform group-hover:scale-110"></div>
            </div>

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-500 transition-colors duration-300">
              {service.title}
            </h3>

            {/* Descripción general (ahora principal) */}
            <p className="text-gray-700 leading-relaxed mb-8 flex-grow">
              {service.descripcion_general}
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
            <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-amber-400/40 group-hover:border-amber-400/65 transition-all transform  duration-400 group-hover:scale-130"></div>
          </Link>
        </div>
      ))}
    </div>
  );
}
