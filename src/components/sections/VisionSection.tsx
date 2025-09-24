"use client";
import Image from "next/image";

export default function VisionSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-tr from-slate-50 via-white to-blue-50">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: "url('images/Law.jpg')",
        }}
        data-aos="slide-right"
        data-aos-delay="0"

      >
        <div 
          className="absolute inset-0 bg-[#111C32] opacity-80"
          data-aos="slide-right"
          data-aos-delay="0"
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div 
              className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mb-4"
              data-aos="fade-down"
              data-aos-delay="300"
              data-aos-duration="1200"
            >
              <div className="w-8 h-px bg-amber-400"></div>
              <span className="uppercase tracking-wider">Nuestra Visión</span>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>

            <h2 
              className="text-4xl lg:text-5xl font-bold text-gray-50 leading-tight"
              data-aos="zoom-in"
              data-aos-delay="400"
              data-aos-duration="1200"
            >
              Profesionalismo que marca la
              <span className="relative ml-3">
                <span className="text-amber-400">diferencia</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </span>
            </h2>

            <div 
              className="space-y-6 text-left"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1200"
            >
              <p className="text-lg text-gray-100 leading-relaxed">
                Ser el establecimiento de comercio número uno en el ejercicio de
                nuestro objeto social, convencidos de que el profesionalismo,
                responsabilidad y compromiso con la prestación de nuestros servicios
                de alta calidad a todos nuestros clientes nos conducirá a tal fin.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div 
            className="lg:w-1/2 relative"
            data-aos="zoom-in-left"
            data-aos-delay="600"
            data-aos-duration="1200"
          >
            <div className="relative group">
              <div 
                className="absolute -inset-4 bg-amber-400/30 rounded-3xl blur opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                data-aos="fade-in"
                data-aos-delay="700"
                data-aos-duration="1200"
              ></div>
              <div className="relative">
                <Image
                  src="/images/Abogados.jpg"
                  alt="Imagen visión"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-102"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}