"use client";
import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      {/* Mission Section Gradient - Only visible on large screens when image is on the left */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[55%] bg-gradient-to-r from-amber-500/25 to-amber-300/0 hidden lg:block"
        data-aos="fade-right"
        data-aos-duration="1000"
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 md:px-1">
  <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          
          {/* Content Column */}
          <div className="order-1 lg:order-2 lg:col-span-6 space-y-6 lg:space-y-8 text-center lg:text-left">
            <div 
              className="inline-flex items-center gap-2 text-amber-500 text-sm font-medium mb-4"
              data-aos="fade-down"
              data-aos-delay="100"
              data-aos-duration="1500"
            >
              <div className="w-8 h-px bg-amber-400"></div>
              <span className="uppercase tracking-wider">Nuestra Misión</span>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>
            
            <h2 
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1500"

            >
              Asesoría jurídica{" "}
              <span className="relative">
                <span className="text-amber-500">especializada</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </span>{" "}
              con confianza
            </h2>
            
            <div 
              className="space-y-6 text-left max-w-2xl mx-auto lg:mx-0"
              data-aos="zoom-in"
              data-aos-delay="300"
              data-aos-offset="50"
              data-aos-duration="1500"

            >
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestra firma ofrece asesoría jurídica especializada y representación en
                Derecho público y Privado, orientación profesional en cuanto a la
                administración de bienes inmuebles, brindando soluciones efectivas en el
                campo de nuestro objeto social, brindando apoyo, confianza y
                tranquilidad a nuestros clientes.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div 
            className="order-2 lg:order-1 lg:col-span-6 relative max-w-[600px] mx-auto lg:mx-0"
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-duration="1500"
          >
            <div className="relative group">
              <div 
                className="absolute -inset-4 bg-amber-400/30 rounded-3xl blur opacity-50 group-hover:opacity-80 transition-opacity duration-300 lg:hidden"
              ></div>
              <div className="relative">
                <Image
                  src="/images/Imagen misión.jpg"
                  alt="Nuestro equipo"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}