"use client";
import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="relative pt-10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      {/* Mission Section Gradient - Only visible on large screens when image is on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-amber-500/30 to-amber-300/0 hidden lg:block"></div>
      
      <div className="relative max-w-7xl mx-auto top-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 px-6 sm:px-10">
          
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-amber-500 text-sm font-medium mb-4">
              <div className="w-8 h-px bg-amber-400"></div>
              <span className="uppercase tracking-wider">Nuestra Misión</span>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Asesoría jurídica{" "}
              <span className="relative">
                <span className="text-amber-500">especializada</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </span>{" "}
              con confianza
            </h2>
            
            <div className="space-y-6 text-left">
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
          <div className="lg:w-120 relative order-2 lg:order-1">
            <div className="relative group">
              <Image
                src="/images/Lawyer.png"
                alt="Nuestro equipo"
                width={600}
                height={400}
              />
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