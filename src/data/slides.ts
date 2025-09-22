export interface Slide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    image: '/images/Slider1.jpg',
    subtitle: '',
    title: 'CONTÁCTANOS AHORA Y DECIDE CON CLARIDAD',
    description: 'Cuéntanos tu caso en minutos y recibe una orientación inicial clara. Estamos listos para ayudarte a tomar la mejor decisión legal, sin rodeos y con total confidencialidad.',
    ctaText: 'CONTACTAR AHORA',
    ctaLink: '/contact'
  },
  {
    id: 2,
    image: '/images/slider2.jpg',
    subtitle: '',
    title: 'DESCUBRE NUESTROS SERVICIOS',
    description: 'Conoce cómo podemos ayudarte con estrategias prácticas, transparentes y enfocadas en resultados.',
    ctaText: 'VER SERVICIOS',
    ctaLink: '/services'
  },
  {
    id: 3,
    image: '/images/slider3.jpg',
    subtitle: '',
    title: '¿QUIÉNES SOMOS Y CÓMO TRABAJAMOS?',
    description: 'Somos un equipo cercano y comprometido. Descubre nuestra misión, visión, valores y la forma en que acompañamos a cada cliente paso a paso.',
    ctaText: 'NOSOTROS',
    ctaLink: '/about'
  }
]