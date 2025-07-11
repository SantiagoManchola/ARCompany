import Image from "next/image";
import Link from "next/link";

export default function InfoSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Columna de texto */}
          <div className="lg:w-1/2 space-y-8">
            <h1 
              className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              Traditional payroll cant
              <span className="relative">
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text"> keep up</span>
                <div className="absolute -bottom-2 left-2 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </span>{" "}
              with your needs
            </h1>

            <p 
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              End the game of payroll whack-a-mole with the ability to pay your
              team
              <span className="font-semibold text-gray-800">
                {" "}
                however you need to
              </span>
              , whenever you need to
            </p>

            {/* Stats */}
            <div 
              className="flex gap-15 py-6"
              data-aos="zoom-in"
              data-aos-delay="0"
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text">500+</div>
                <div className="text-sm text-gray-500 font-medium">
                  Cases Won
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text">5+</div>
                <div className="text-sm text-gray-500 font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text">98%</div>
                <div className="text-sm text-gray-500 font-medium">
                  Success Rate
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4"
              data-aos="fade-up"
              data-aos-delay="0"
              data-aos-offset="100"
            >
              <Link
                href="/contact"
                className="group relative bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">See how it works</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/about"
                className="group border-2 border-gray-300 hover:border-amber-400 text-gray-700 hover:text-amber-500 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-amber-50/40"
              >
                <span className="flex items-center gap-2">
                  Learn more
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Columna de imagen */}
          <div 
            className="lg:w-1/2 relative"
            data-aos="flip-left"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-300 to-amber-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

            <div className="relative group">
              <Image
                src="/images/Abogados.jpg"
                alt="Legal professionals illustration"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}