"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 140, 
      delay: 0, 
      easing: "ease-in-out-quad", 
      mirror: false,
      anchorPlacement: "top-bottom", 
    });
  }, []);

  return null;
}