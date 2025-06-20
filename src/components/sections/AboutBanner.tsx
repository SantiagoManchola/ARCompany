"use client";
export default function BannerSection() {
  return (
    <section className="relative h-[40vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/BG Banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-4xl mx-auto">
          

          {/* Main Title */}
          <h1 className="text-5xl lg:text-6x1 font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* Sobre{" "} */}
            <span className="relative">
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text">Nosotros</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-200 text-xl leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Somos un equipo de profesionales comprometidos con la excelencia jurídica, 
            brindando soluciones integrales y personalizadas para cada uno de nuestros clientes.
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
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