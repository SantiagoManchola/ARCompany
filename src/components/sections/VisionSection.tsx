"use client";
import Image from "next/image";

export default function VisionSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-slate-50"></div>
      <div className="absolute inset-0 lg:bg-gradient-to-l from-amber-500 via-white to-white opacity-30"></div> */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: "url('images/law.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#111C32] opacity-80"></div>
      </div>


      {/* Geometric decorations */}
      <div className="absolute top-32 left-20 w-4 h-4 bg-amber-400/60 rounded-full animate-bounce"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
              <div className="w-8 h-px bg-amber-400"></div>
              <span className="uppercase tracking-wider">Nuestra Visión</span>
              <div className="w-8 h-px bg-amber-400"></div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-50 leading-tight">
              Liderando el
              <span className="relative ml-3">
                <span className="text-amber-400">futuro</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </span>{" "}
              del derecho
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-gray-100 leading-relaxed">
                Aspiramos a ser reconocidos como la firma de abogados líder en innovación 
                y excelencia jurídica, estableciendo nuevos estándares en la prestación 
                de servicios legales a través de la tecnología, la especialización y 
                un enfoque centrado en el cliente.
              </p>

              <p className="text-lg text-gray-100 leading-relaxed">
                Visualizamos un futuro donde la justicia sea más accesible, eficiente 
                y comprensible para todos, siendo pioneros en la transformación digital 
                del sector legal mientras mantenemos los más altos valores éticos y profesionales.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2 relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber-400/30 rounded-3xl blur opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative">
                <Image
                  src="/images/abogados.jpg"
                  alt="Imagen visión"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2x"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}