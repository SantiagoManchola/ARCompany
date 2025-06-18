"use client";

import { useState, useEffect } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Tu número de WhatsApp (cambia por el tuyo)
  const phoneNumber = "573001234567"; // Formato: código país + número sin espacios ni símbolos
  const message = "¡Hola! Me interesa conocer más sobre sus servicios legales.";
  
  // Construir URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Mostrar el botón después de un pequeño delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Botón Principal */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        {/* Ondas de animación */}
        <div className="relative">
          {/* Onda 1 */}
          <div
            className={`absolute inset-0 bg-green-400 rounded-full animate-ping ${
              isHovered ? "opacity-80" : "opacity-50"
            }`}
            style={{ animationDuration: "2s" }}
          />
          
          {/* Onda 2 */}
          <div
            className={`absolute inset-0 bg-green-400 rounded-full animate-ping ${
              isHovered ? "opacity-60" : "opacity-30"
            }`}
            style={{ animationDuration: "2s", animationDelay: "0.7s" }}
          />

          {/* Botón principal */}
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform ${
              isHovered ? "scale-110 shadow-green-500/50" : "scale-100"
            } hover:shadow-green-500/30 active:scale-95`}
            aria-label="Contactar por WhatsApp"
          >
            {/* Icono de WhatsApp */}
            <svg
              className={`w-8 h-8 transition-all duration-300 ${
                isHovered ? "rotate-12" : "rotate-0"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </button>
        </div>

        {/* Tooltip */}
        <div
          className={`absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 transform ${
            isHovered
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-2 opacity-0 scale-95"
          }`}
          style={{ transformOrigin: "bottom right" }}
        >
          ¡Contáctanos por WhatsApp!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
        </div>
      </div>

      {/* Estilos adicionales */}
      <style jsx global>{`
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }

        /* Mejorar la animación de ping para WhatsApp */
        @keyframes whatsapp-ping {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          75% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}