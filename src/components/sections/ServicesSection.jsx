import Link from "next/link";

const ServicesSection = ({ services }) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/Services.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
            <div className="w-8 h-px bg-amber-400"></div>
            <span className="uppercase tracking-wider">
              NUESTROS SERVICIOS
            </span>
            <div className="w-8 h-px bg-amber-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Comprometidos con la justicia
            <br />
            y la excelencia profesional
          </h2>
        </div>

        {/* Services Grid */}
        <div className={`grid gap-8 max-w-6xl mx-auto ${
          services.length === 3 
            ? 'grid-cols-1 md:grid-cols-3' 
            : services.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' 
              : services.length === 1 
                ? 'grid-cols-1 max-w-md' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group block">
              <div className="flex flex-col items-center text-center p-9 rounded-xl border border-amber-400/50 bg-black/25 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/10 hover:border-amber-400/60 hover:transform hover:scale-105 hover:shadow-2xl h-full">
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-400/30 to-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-amber-400/40 group-hover:to-amber-500/30 transition-all duration-300 group-hover:scale-110">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-8 h-8 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105"
          >
            <span>Ver servicios</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;