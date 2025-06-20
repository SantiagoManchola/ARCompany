import Image from "next/image";
import Link from "next/link";

export default function InfoSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute -bottom-30 -left-10 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Columna de texto */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Traditional payroll cant
              <span className="relative">
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text"> keep up</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </span>{" "}
              with your needs
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              End the game of payroll whack-a-mole with the ability to pay your
              team
              <span className="font-semibold text-gray-800">
                {" "}
                however you need to
              </span>
              , whenever you need to
            </p>

            {/* Stats */}
            <div className="flex gap-15 py-6">
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group relative bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">See how it works</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* <div className="absolute inset-0 bg-black/25 rounded-xl opacity-0 group-hover:opacity-0 animate-pulse"></div> */}
              </Link>

              <Link
                href="/about"
                className="group border-2 border-gray-300 hover:border-amber-400 text-gray-700 hover:text-amber-500 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-amber-50"
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
          <div className="lg:w-1/2 relative">
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-300 to-amber-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

            <div className="relative group">
              <Image
                src="/images/Abogados.jpg"
                alt="Legal professionals illustration"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 object-cover"
              />

              {/* Floating badge 
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Trusted by 1000+</div>
                      <div className="text-sm text-gray-500">Happy clients</div>
                    </div>
                  </div>
                </div>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
