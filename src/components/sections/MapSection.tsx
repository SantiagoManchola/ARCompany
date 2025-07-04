'use client';

import React from 'react';

export default function MapSection() {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">

        {/* Map Container */}
        <div className="relative">
          {/* Enhanced shadow background */}
          <div className="absolute -inset-6 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-3xl blur opacity-30"></div>
          
          {/* Map Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            
            {/* Map Header */}
            <div className="relative bg-gradient-to-r from-amber-400 to-amber-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold">AR Company - Oficina Principal</h3>
                    <p className="hidden sm:block text-amber-100 text-sm">Carrera 4 No. 10-38 oficina 201 Edificio Vela</p>
                  </div>
                </div>
                
                {/* Directions Button */}
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=4.445355813830964,-75.24154039630838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-lg bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center gap-2"
                >
                  <svg className="w-6 h-6 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                  Cómo llegar
                  <svg className="w-8 h-8 md:w-5 md:h-5 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative h-150 bg-gray-100">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4130.645347014825!2d-75.24125906662856!3d4.444942888691573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c4847b6859ef%3A0x72e8c83303b97463!2sCra%204%20%2310-38%2C%20Ibagu%C3%A9%2C%20Tolima!5e0!3m2!1ses!2sco!4v1751594431367!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-b-3xl"
              ></iframe>
            </div>            
          </div>
        </div>
      </div>
    </section>
  );
}