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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
            <div className="w-8 h-px bg-amber-400"></div>
            <span className="uppercase tracking-wider">
              WHY YOU SHOULD CHOOSE US?
            </span>
            <div className="w-8 h-px bg-amber-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            We are committed to administering justice
            <br />
            not just winning cases
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group block">
              <div className="flex items-start gap-4 p-6 rounded-lg border border-amber-400/50 bg-black/25 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/12 hover:border-amber-400/60 hover:transform hover:scale-105">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-amber-400/30 rounded-lg flex items-center justify-center group-hover:bg-amber-400/30 transition-colors duration-300">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-6 h-6 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
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
      </div>
    </section>
  );
};

export default ServicesSection;
