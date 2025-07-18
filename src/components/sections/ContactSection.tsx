"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Formulario enviado:", formData);
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* White Background */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Decorative Elements */}
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
        {/* Header Section */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 text-amber-500 text-sm font-medium mb-4">
            <div className="w-8 h-px bg-amber-500"></div>
            <span className="uppercase tracking-wider">HABLEMOS</span>
            <div className="w-8 h-px bg-amber-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comencemos una{" "}
            <span className="relative">
              <span className="text-amber-500">conversación</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
            </span>
          </h2>
          <p className="text-gray-600 text-lg  mx-auto leading-relaxed">
            Estamos aquí para ayudarte con tus necesidades jurídicas. 
            Contáctanos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="group relative flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-400 overflow-hidden">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Teléfono/WhatsApp</h3>
                  <p className="text-gray-600">+57 (XXX) XXX-XXXX</p>
                </div>
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-500"></div>
              </div>
              
              <div className="group relative flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-400 overflow-hidden">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@arcompany.com</p>
                </div>
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-500"></div>
              </div>
              
              <div className="group relative flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-400 overflow-hidden">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Ubicación</h3>
                  <p className="text-gray-600">Carrera 4 No. 10-38 oficina 201 Edificio Vela</p>
                  
                </div>
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-500"></div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-400 p-6 mt-8 overflow-hidden">
              <h3 className="text-gray-900 font-semibold mb-3">Horarios de Atención</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span>Cerrado</span>
                </div>
              </div>
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-500"></div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3 relative">
            {/* Enhanced shadow background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-3xl blur opacity-30"></div>
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-gray-100"></div>
            
            <div className="relative p-8 md:p-12">
              {!submitted ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-gray-900 font-medium mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Ej: Juan Pérez González"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all duration-300"
                    />
                  </div>

                  {/* Phone and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-900 font-medium mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Ej: +57 123 456 7890"
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-900 font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Ej: tu@email.com"
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <label htmlFor="subject" className="block text-gray-900 font-medium mb-2">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white text-gray-900">Selecciona el asunto</option>
                      <option value="consulta-general" className="bg-white text-gray-900">Consulta General</option>
                      <option value="derecho-civil" className="bg-white text-gray-900">Derecho Civil</option>
                      <option value="derecho-penal" className="bg-white text-gray-900">Derecho Penal</option>
                      <option value="derecho-laboral" className="bg-white text-gray-900">Derecho Laboral</option>
                      <option value="derecho-comercial" className="bg-white text-gray-900">Derecho Comercial</option>
                      <option value="derecho-familia" className="bg-white text-gray-900">Derecho de Familia</option>
                      <option value="otros" className="bg-white text-gray-900">Otros</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-4 top-12 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-gray-900 font-medium mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:from-amber-300 disabled:to-amber-400 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">¡Mensaje enviado exitosamente!</h3>
                  <p className="text-gray-600 text-lg">
                    Gracias por contactarnos. Te responderemos lo antes posible.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}