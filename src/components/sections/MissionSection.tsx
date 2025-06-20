"use client";
import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="relative pt-10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      
      <div className="relative max-w-7xl mx-auto top-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 px-6 sm:px-10">
          
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-amber-600 text-sm font-medium mb-4">
              <div className="w-8 h-px bg-amber-400"></div>
              <span className="uppercase tracking-wider">Nuestra Misión</span>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Construyendo{" "}
              <span className="relative ml-3">
                <span className="text-amber-500">confianza</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </span>{" "}
              a través de la excelencia
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestra misión es proporcionar servicios jurídicos de la más alta calidad, 
                con un enfoque personalizado y comprometido con los resultados de nuestros 
                clientes. Creemos en la importancia de construir relaciones duraderas 
                basadas en la confianza, la transparencia y la excelencia profesional.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nos esforzamos por ser más que asesores legales; somos partners estratégicos 
                que acompañan a nuestros clientes en cada paso de su camino, ofreciendo 
                soluciones innovadoras y efectivas para sus desafíos jurídicos.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:w-120 relative order-2 lg:order-1">
            <div className="sm:sticky lg:absolute lg:-inset-50 lg:w-[740px] bg-gradient-to-r from-amber-500 to-amber-300/0 rounded-r-3xl opacity-30"></div>
            <div className="relative group">
              <Image
                src="/images/Lawyer.png"
                alt="Nuestro equipo trabajando"
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