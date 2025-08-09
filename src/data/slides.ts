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
    title: 'WHEN WE TAKE YOUR CASE WE TAKE YOUR CAUSE',
    description: 'Nuestro equipo legal especializado está comprometido con la defensa de sus derechos. Ofrecemos representación legal experta con un enfoque personalizado para cada cliente.',
    ctaText: 'CONSULTA GRATUITA',
    ctaLink: '/contact'
  },
  {
    id: 2,
    image: 'Estatua2.jpg',
    subtitle: 'Experiencia Legal Comprobada',
    title: 'PROTECTING YOUR RIGHTS WITH DEDICATION',
    description: 'Con años de experiencia en el sistema legal, defendemos sus intereses con pasión y profesionalismo. Su causa es nuestra prioridad.',
    ctaText: 'VER SERVICIOS',
    ctaLink: '/services'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
    subtitle: 'Resultados que Importan',
    title: 'YOUR SUCCESS IS OUR COMMITMENT',
    description: 'Trabajamos incansablemente para obtener los mejores resultados para nuestros clientes. Cada caso es tratado con la máxima dedicación y expertise legal.',
    ctaText: 'CONOCER MÁS',
    ctaLink: '/about'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    subtitle: 'Atención Personalizada 24/7',
    title: 'ALWAYS HERE WHEN YOU NEED US',
    description: 'Entendemos que los problemas legales no esperan. Por eso ofrecemos atención personalizada y estamos disponibles cuando más nos necesita.',
    ctaText: 'CONTACTAR AHORA',
    ctaLink: '/contact'
  }
]