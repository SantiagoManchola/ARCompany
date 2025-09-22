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
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    subtitle: '',
    title: 'CONTÁCTANOS AHORA Y DECIDE CON CLARIDAD',
    description: 'Cuéntanos tu caso en minutos y recibe una orientación inicial clara. Estamos listos para ayudarte a tomar la mejor decisión legal, sin rodeos y con total confidencialidad.',
    ctaText: 'CONTACTAR AHORA',
    ctaLink: '/contact'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
    subtitle: '',
    title: 'DESCUBRE NUESTROS SERVICIOS',
    description: 'Conoce cómo podemos ayudarte con estrategias prácticas, transparentes y enfocadas en resultados.',
    ctaText: 'VER SERVICIOS',
    ctaLink: '/services'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    subtitle: '',
    title: '¿QUIÉNES SOMOS Y CÓMO TRABAJAMOS?',
    description: 'Somos un equipo cercano y comprometido. Descubre nuestra misión, visión, valores y la forma en que acompañamos a cada cliente paso a paso.',
    ctaText: 'NOSOTROS',
    ctaLink: '/about'
  }
]