"use client";
import { useEffect, useState } from "react";
import { realStateProperties } from "@/data/realState";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";

export default function RealStateSeccion() {
  const [filter, setFilter] = useState<"TODOS" | "VENTA" | "ARRIENDO">("TODOS");
  // Used to force remount and re-trigger animations on every click
  const [animateSeed, setAnimateSeed] = useState(0);
  
  const filteredProperties = (filter === "TODOS" 
    ? realStateProperties 
    : realStateProperties.filter(prop => prop.operacion === filter))
    .sort((a, b) => b.precio - a.precio);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    try {
      AOS.refreshHard();
    } catch (_) {
    }
  }, [animateSeed, filter]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="1200">          
            <div className="relative inline-block pb-3 mb-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Inmuebles Recientes
            </h2>
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
            </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre nuestra selección de propiedades disponibles
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12" data-aos="fade-up" data-aos-delay="100">
          <button
            onClick={() => {
              if (filter !== "TODOS") {
                setFilter("TODOS");
                setAnimateSeed((s) => s + 1);
              }
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
              filter === "TODOS"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 shadow-lg border border-transparent"
                : "bg-white text-gray-800 hover:bg-gray-200 border border-gray-200 cursor-pointer"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => {
              if (filter !== "VENTA") {
                setFilter("VENTA");
                setAnimateSeed((s) => s + 1);
              }
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
              filter === "VENTA"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 shadow-lg border border-transparent"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200 cursor-pointer"
            }`}
          >
            Venta
          </button>
          <button
            onClick={() => {
              if (filter !== "ARRIENDO") {
                setFilter("ARRIENDO");
                setAnimateSeed((s) => s + 1);
              }
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
              filter === "ARRIENDO"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 shadow-lg border border-transparent"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200 cursor-pointer"
            }`}
          >
            Arriendo
          </button>
        </div>

        {/* Properties Grid */}
        <div key={`grid-${animateSeed}`} className="grid grid-cols-1 px-10 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filteredProperties.map((property, index) => (
            <div
              key={`${property.id}-${animateSeed}`}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              data-aos-offset="0"
              
            >
              <Link href={`/bienes-raices/${property.slug}`}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl h-full cursor-pointer">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {property.imagenes[0] ? (
                  <Image
                    src={property.imagenes[0].url}
                    alt={property.imagenes[0].alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-300 to-gray-400">
                    <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                )}
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    property.operacion === "VENTA" 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  }`}>
                    {property.operacion}
                  </span>
                </div>

                {/* Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800">
                    {property.tipo}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 
                  className="font-bold text-lg text-gray-900 mb-2 truncate group-hover:text-amber-500 transition-colors duration-300 ease-in-out"
                  title={property.titulo}
                >
                  {property.titulo}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <svg className="w-5 h-5 mr-1.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{property.ciudad}</span>
                </div>

                {/* Features */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  {/* Habitaciones - Icono de Cama */}
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 640 512">
                      <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
                    </svg>
                    <span>{property.alcobas}</span>
                  </div>
                  {/* Baños - Icono de Ducha */}
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M64 131.9C64 112.1 80.1 96 99.9 96c9.5 0 18.6 3.8 25.4 10.5l16.2 16.2c-21 38.9-17.4 87.5 10.9 123L151 247c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L345 121c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-1.3 1.3c-35.5-28.3-84.2-31.9-123-10.9L170.5 61.3C151.8 42.5 126.4 32 99.9 32C44.7 32 0 76.7 0 131.9V448c0 17.7 14.3 32 32 32s32-14.3 32-32V131.9zM256 352a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32-32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                    </svg>
                    <span>{property.banos}</span>
                  </div>
                  {/* Garajes - Icono de Carro */}
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.772 10.156l-1.368-4.105A2.995 2.995 0 0016.559 4H7.441a2.995 2.995 0 00-2.845 2.051l-1.368 4.105A2.003 2.003 0 002 12v5c0 .753.423 1.402 1.039 1.743-.013.066-.039.126-.039.195V21a1 1 0 001 1h1a1 1 0 001-1v-2h12v2a1 1 0 001 1h1a1 1 0 001-1v-2.062c0-.069-.026-.13-.039-.195A1.993 1.993 0 0022 17v-5c0-.829-.508-1.541-1.228-1.844zM4 17v-5h16l.002 5H4zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 017.441 6z"/>
                      <circle cx="6.5" cy="14.5" r="1.5"/>
                      <circle cx="17.5" cy="14.5" r="1.5"/>
                    </svg>
                    <span>{property.garajes}</span>
                  </div>
                  {/* Área */}
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span>{property.area}m²</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Precio</p>
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                      {formatPrice(property.precio)}
                    </p>
                  </div>
                  <button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16" data-aos="fade-up">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay propiedades disponibles</h3>
            <p className="text-gray-500">Intenta con otro filtro o vuelve más tarde</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <p className="text-gray-600 mb-6">¿No encuentras lo que buscas?</p>
          <a
            href="/contact"
            className="inline-flex items-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Contáctanos
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
