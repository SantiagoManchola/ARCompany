"use client";
import Image from "next/image";

export default function VisionSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/Services.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-slate-900/80 to-gray-900/90"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-16 w-72 h-72 bg-amber-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div
        className="absolute -bottom-20 -left-16 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Geometric decorations */}
      <div className="absolute top-32 left-20 w-4 h-4 bg-amber-400/60 rounded-full animate-bounce"></div>
      <div className="absolute bottom-40 right-32 w-6 h-6 bg-amber-400/40 rotate-45"></div>
      <div className="absolute top-1/2 right-20 w-12 h-1 bg-amber-400/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8">
            {/* Section label */}
            <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
              <div className="w-8 h-px bg-amber-400"></div>
              <span className="uppercase tracking-wider">Nuestra Visión</span>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Liderando el
              <span className="relative ml-3">
                <span className="text-amber-400">futuro</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </span>{" "}
              del derecho
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-gray-200 leading-relaxed">
                Aspiramos a ser reconocidos como la firma de abogados líder en innovación 
                y excelencia jurídica, estableciendo nuevos estándares en la prestación 
                de servicios legales a través de la tecnología, la especialización y 
                un enfoque centrado en el cliente.
              </p>

              <p className="text-lg text-gray-200 leading-relaxed">
                Visualizamos un futuro donde la justicia sea más accesible, eficiente 
                y comprensible para todos, siendo pioneros en la transformación digital 
                del sector legal mientras mantenemos los más altos valores éticos y profesionales.
              </p>
            </div>

            {/* Vision pillars */}
            <div className="grid grid-cols-1 gap-6 mt-10">
              <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-amber-400/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Innovación Constante</h3>
                  <p className="text-gray-300 text-sm">
                    Implementamos las últimas tecnologías para optimizar procesos y ofrecer 
                    servicios más eficientes y accesibles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-amber-400/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Impacto Social</h3>
                  <p className="text-gray-300 text-sm">
                    Contribuimos al desarrollo de una sociedad más justa y equitativa 
                    a través de nuestro compromiso con la responsabilidad social.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-amber-400/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Excelencia Profesional</h3>
                  <p className="text-gray-300 text-sm">
                    Mantenemos los más altos estándares de calidad y ética profesional 
                    en cada proyecto que emprendemos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2 relative">
            <div className="relative group">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-blue-400/20 rounded-3xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              
              <div className="relative">
                <Image
                  src="/images/Abogados.jpg"
                  alt="Visión de futuro"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 object-cover"
                />
                
                {/* Overlay with icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                
                {/* Floating element */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}