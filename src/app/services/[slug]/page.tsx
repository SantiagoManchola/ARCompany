"use client";

import { notFound } from "next/navigation";
import { useServicioBySlug } from "@/hooks/useServicios";
import { useState, useEffect } from "react";

export default function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    params.then(({ slug: paramSlug }) => {
      setSlug(paramSlug);
    });
  }, [params]);

  if (!slug) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
      </main>
    );
  }

  return <ServicioPageContent slug={slug} />;
}

function ServicioPageContent({ slug }: { slug: string }) {
  const { servicio, loading, error } = useServicioBySlug(slug);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando servicio...</p>
        </div>
      </main>
    );
  }

  if (error || !servicio) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Banner del servicio integrado */}
      <section className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${servicio.imagen_banner}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="lg:w-2/3 xl:w-1/2 space-y-4 sm:space-y-6">
                {/* Main Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-amber-300 to-amber-400 text-transparent bg-clip-text">
                      {servicio.titulo_banner}
                    </span>
                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full"></div>
                  </span>
                </h1>

                {/* Description */}
                <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl lg:max-w-none">
                  {servicio.descripcion_banner}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal rediseñado */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-1">
          <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16">
            {/* Columna izquierda - Descripción */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
              {/* Subtítulo */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-500 text-sm font-medium mb-4">
                <div className="w-6 sm:w-8 h-px bg-amber-400"></div>
                <span className="uppercase tracking-wider text-xs sm:text-sm">
                  ¿En qué consiste?
                </span>
                <div className="w-6 sm:w-8 h-px bg-amber-400"></div>
              </div>

              {/* Título de la sección */}
              <h2 className="text-4xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 leading-tight text-center lg:text-left">
                {servicio.nombre}
              </h2>

              {/* Descripción detallada */}
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed text-center lg:text-left">
                  {servicio.descripcion}
                </p>
              </div>

              {/* CTA Card - Solo visible en pantallas grandes */}
              <div className="hidden lg:block w-full max-w-xl mx-auto lg:max-w-none">
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-white">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                      ¿NECESITAS ASESORÍA?
                    </h3>
                    <p className="text-amber-100 mb-4 sm:mb-6 text-base sm:text-lg">
                      Nuestro equipo está listo para brindarte la mejor asesoría
                      legal
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <a
                        href="/contact"
                        className="inline-block bg-white text-amber-500 font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      >
                        Solicitar Consulta
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Áreas de especialización */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
              {/* Subtítulo */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-500 text-sm font-medium mb-4">
                <div className="w-6 sm:w-8 h-px bg-amber-400"></div>
                <span className="uppercase tracking-wider text-xs sm:text-sm">
                  Áreas de Especialización
                </span>
                <div className="w-6 sm:w-8 h-px bg-amber-400"></div>
              </div>

              {/* Grid de áreas */}
              <div className="space-y-3 sm:space-y-4">
                {servicio.areas_especializacion.map((areaObj, index) => (
                  <div
                    key={areaObj.id || index}
                    className="group bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-xl border border-gray-100 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400/20 to-amber-500/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500"
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
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                          {areaObj.area}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Card - Solo visible en pantallas pequeñas y medianas */}
          <div className="lg:hidden mt-8 sm:mt-12">
            <div className="w-full">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-white">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    ¿NECESITAS ASESORÍA?
                  </h3>
                  <p className="text-amber-100 mb-4 sm:mb-6 text-base sm:text-lg">
                    Nuestro equipo está listo para brindarte la mejor asesoría
                    legal
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-block bg-white text-amber-500 font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      Solicitar Consulta
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
