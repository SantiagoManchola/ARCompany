"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="py-10 border-b border-gray-700/90 ">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="lg:col-span-1 space-y-6">
              <div className="flex justify-center space-x-0">
                <Image
                  src="/images/Logo AR COMPANY.png"
                  alt="AR Company Logo"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div className="">
                  <Image
                    src="/images/Logo BYJ.png"
                    alt="Logo"
                    width={200}
                    height={100}
                    className="rounded"
                  />
                </div>
              </div>


              {/* Iconos Redes Sociales */}
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 relative">
                Enlaces Rápidos
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/real-state"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Bienes Raíces
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Servicios */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 relative">
                Servicios
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/corporate"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Derecho Corporativo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/civil"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Derecho Civil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/labor"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Derecho Laboral
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/real-estate"
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Bienes Raíces
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contáctanos*/}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6 relative">
                Contáctanos
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </h4>
              <p className="text-gray-300 text-sm mb-6">
                ¿Necesitas asesoría? Estamos aquí para ayudarte con soluciones
                jurídicas integrales.
              </p>

              <div className="mb-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contactar Ahora
                </Link>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-300 text-sm">
                  <svg
                    className="w-4 h-4 mr-3 text-amber-400"
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
                  +57 (XXX) XXX-XXXX
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <svg
                    className="w-4 h-4 mr-3 text-amber-400"
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
                  info@arcompany.com
                </div>
                <div className="flex items-start text-gray-300 text-sm">
                  <svg
                    className="w-4.0 h-5 mr-3 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.9 1.9 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0"
                    />
                  </svg>
                  Carrera 4 No. 10-38 oficina 201 Edificio Vela
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} AR Company. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
