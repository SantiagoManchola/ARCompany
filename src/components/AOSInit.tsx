"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en ms
      once: true, // Si true, la animación ocurre solo una vez
      offset: 120, // Offset desde el elemento original
      delay: 0, // Delay global para todas las animaciones
      easing: "ease-in-out-quad", // Tipo de easing
      mirror: false, // Si true, los elementos se animan cuando salen del viewport
      anchorPlacement: "top-bottom", // Punto de anclaje para el cálculo del offset
    });
  }, []);

  return null;
}