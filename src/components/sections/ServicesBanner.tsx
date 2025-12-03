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
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-4xl mx-auto">
          

          {/* Main Title */}
          <h1
            className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            data-aos="fade-down"
            data-aos-delay="200"
            data-aos-duration="1300"
          >
            {/* Sobre{" "} */}
            <span className="relative">
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text">Servicios</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-gray-200 text-xl leading-relaxed max-w-3xl mx-auto"
            data-aos="zoom-in"
            data-aos-delay="400"
            data-aos-duration="1300"
          >
            Ofrecemos servicios legales con la experiencia y dedicación que tu caso merece.
          </p>
        </div>
      </div>
    </section>
  );
}