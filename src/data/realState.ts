import { RealStateProperty } from "@/types/api";

// Datos de ejemplo de propiedades - Reemplazar con llamado a API
export const realStateProperties: RealStateProperty[] = [
  {
    id: "1",
    tipo: "CASA",
    operacion: "VENTA",
    titulo: "Casa en Villa Mayor",
    descripcion: "Amplia casa ubicada en sector residencial con excelente acceso a vías principales y centros comerciales. Cuenta con espacios amplios e iluminados, perfecta para familias que buscan comodidad y tranquilidad.",
    precio: 550000000,
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    barrio: "Villa Mayor",
    direccion: "Calle 45 #12-34",
    area: 100,
    alcobas: 3,
    banos: 2,
    garajes: 1,
    estrato: 3,
    antiguedad: 5,
  pisos: 2,
    imagenes: [
      {
        id: "img-1",
        url: "/images/propiedades/casa-villa-mayor.jpg",
        alt: "Casa en Villa Mayor - Fachada",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-thumb.jpg"
      },
      {
        id: "img-1-2",
        url: "/images/propiedades/casa-villa-mayor-2.jpg",
        alt: "Casa en Villa Mayor - Sala",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-2-thumb.jpg"
      },
      {
        id: "img-1-3",
        url: "/images/propiedades/casa-villa-mayor-3.jpg",
        alt: "Casa en Villa Mayor - Cocina",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-3-thumb.jpg"
      },
      {
        id: "img-1",
        url: "/images/propiedades/casa-villa-mayor.jpg",
        alt: "Casa en Villa Mayor - Fachada",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-thumb.jpg"
      },
      {
        id: "img-1-2",
        url: "/images/propiedades/casa-villa-mayor-2.jpg",
        alt: "Casa en Villa Mayor - Sala",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-2-thumb.jpg"
      },
      {
        id: "img-1-3",
        url: "/images/propiedades/casa-villa-mayor-3.jpg",
        alt: "Casa en Villa Mayor - Cocina",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-3-thumb.jpg"
      },
      {
        id: "img-1",
        url: "/images/propiedades/casa-villa-mayor.jpg",
        alt: "Casa en Villa Mayor - Fachada",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-thumb.jpg"
      },
      {
        id: "img-1-2",
        url: "/images/propiedades/casa-villa-mayor-2.jpg",
        alt: "Casa en Villa Mayor - Sala",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-2-thumb.jpg"
      },
      {
        id: "img-1-3",
        url: "/images/propiedades/casa-villa-mayor-3.jpg",
        alt: "Casa en Villa Mayor - Cocina",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-3-thumb.jpg"
      },
      {
        id: "img-1",
        url: "/images/propiedades/casa-villa-mayor.jpg",
        alt: "Casa en Villa Mayor - Fachada",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-thumb.jpg"
      },
      {
        id: "img-1-2",
        url: "/images/propiedades/casa-villa-mayor-2.jpg",
        alt: "Casa en Villa Mayor - Sala",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-2-thumb.jpg"
      },
      {
        id: "img-1-3",
        url: "/images/propiedades/casa-villa-mayor-3.jpg",
        alt: "Casa en Villa Mayor - Cocina",
        thumbnailURL: "/images/propiedades/casa-villa-mayor-3-thumb.jpg"
      }
    ],
    caracteristicas: [
      "Cocina integral",
      "Zona de lavandería",
      "Patio trasero",
      "Closets en todas las habitaciones",
      "Cerca a transporte público",
      "Vigilancia en el sector",
      "Parqueadero cubierto",
      "Sala y comedor independientes"
    ],
    slug: "casa-villa-mayor",
    destacado: true,
    estado: "DISPONIBLE",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "2",
    tipo: "APARTAMENTO",
    operacion: "VENTA",
    titulo: "Apartamento en Madrid Piamonti",
    descripcion: "Moderno apartamento en conjunto cerrado con zonas comunes, portería 24/7 y excelente ubicación. Ideal para familias que buscan seguridad y comodidad en un ambiente tranquilo.",
    precio: 210000000,
    ciudad: "Madrid",
    departamento: "Cundinamarca",
    barrio: "Piamonti",
    direccion: "Carrera 8 #15-20 Apto 401",
    area: 60,
    alcobas: 3,
    banos: 2,
    garajes: 1,
    estrato: 3,
    piso: 4,
    antiguedad: 3,
    administracion: 150000,
    imagenes: [
      {
        id: "img-2",
        url: "/images/propiedades/apartamento-madrid.jpg",
        alt: "Apartamento Madrid Piamonti",
        thumbnailURL: "/images/propiedades/apartamento-madrid-thumb.jpg"
      },
      {
        id: "img-2-2",
        url: "/images/propiedades/apartamento-madrid-2.jpg",
        alt: "Apartamento Madrid - Interior",
        thumbnailURL: "/images/propiedades/apartamento-madrid-2-thumb.jpg"
      }
    ],
    caracteristicas: [
      "Conjunto cerrado",
      "Parqueadero cubierto",
      "Zonas comunes completas",
      "Portería 24/7",
      "Salón social",
      "Juegos infantiles",
      "Gimnasio",
      "Ascensor",
      "Balcón",
      "Cocina integral"
    ],
    slug: "apartamento-madrid-piamonti",
    destacado: true,
    estado: "DISPONIBLE",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z"
  },
  {
    id: "3",
    tipo: "CASA",
    operacion: "VENTA",
    titulo: "Casa Barrio Catalina",
    descripcion: "Hermosa casa de dos plantas con amplios espacios, ideal para familias. Ubicación estratégica.",
    precio: 900000000,
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    barrio: "Catalina",
    area: 236,
    alcobas: 5,
    banos: 4,
    garajes: 0,
    estrato: 4,
  pisos: 2,
    imagenes: [
      {
        id: "img-3",
        url: "/images/propiedades/casa-catalina.jpg",
        alt: "Casa Barrio Catalina",
        thumbnailURL: "/images/propiedades/casa-catalina-thumb.jpg"
      }
    ],
    caracteristicas: [
      "Dos plantas",
      "Cocina integral moderna",
      "Sala comedor amplios",
      "Zona de ropas",
      "Patio trasero",
      "Estudio"
    ],
    slug: "casa-barrio-catalina",
    destacado: true,
    estado: "DISPONIBLE",
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-01-05T10:00:00Z"
  },
  {
    id: "4",
    tipo: "APARTAMENTO",
    operacion: "VENTA",
    titulo: "Apartamento Venta Moderno",
    descripcion: "Apartamento completamente remodelado con acabados de primera calidad. Listo para estrenar.",
    precio: 220500000,
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    area: 37,
    alcobas: 2,
    banos: 1,
    garajes: 0,
    estrato: 3,
    piso: 2,
    administracion: 120000,
    imagenes: [
      {
        id: "img-4",
        url: "/images/propiedades/apartamento-moderno.jpg",
        alt: "Apartamento moderno remodelado",
        thumbnailURL: "/images/propiedades/apartamento-moderno-thumb.jpg"
      }
    ],
    caracteristicas: [
      "Remodelado",
      "Cocina integral nueva",
      "Baño moderno",
      "Pisos en cerámica",
      "Iluminación natural",
      "Balcón"
    ],
    slug: "apartamento-venta-moderno",
    destacado: false,
    estado: "DISPONIBLE",
    createdAt: "2025-01-20T10:00:00Z",
    updatedAt: "2025-01-20T10:00:00Z"
  },
  {
    id: "5",
    tipo: "APARTAMENTO",
    operacion: "ARRIENDO",
    titulo: "Apartamento en Arriendo - Centro",
    descripcion: "Cómodo apartamento en el centro de la ciudad, cerca de universidades y centros comerciales.",
    precio: 1500000,
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    barrio: "Centro",
    area: 45,
    alcobas: 2,
    banos: 1,
    garajes: 0,
    estrato: 3,
    piso: 3,
    administracion: 100000,
    imagenes: [
      {
        id: "img-5",
        url: "/images/propiedades/apartamento-arriendo.jpg",
        alt: "Apartamento en arriendo centro",
        thumbnailURL: "/images/propiedades/apartamento-arriendo-thumb.jpg"
      }
    ],
    caracteristicas: [
      "Cerca al centro",
      "Transporte público",
      "Cocina equipada",
      "Closets empotrados",
      "Ventilación natural"
    ],
    slug: "apartamento-arriendo-centro",
    destacado: false,
    estado: "DISPONIBLE",
    createdAt: "2025-01-22T10:00:00Z",
    updatedAt: "2025-01-22T10:00:00Z"
  },
  {
    id: "6",
    tipo: "LOCAL",
    operacion: "ARRIENDO",
    titulo: "Local Comercial Avenida Principal",
    descripcion: "Excelente local comercial sobre vía principal con alto flujo vehicular y peatonal.",
    precio: 3500000,
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    area: 80,
    alcobas: 0,
    banos: 2,
    garajes: 0,
    estrato: 3,
    imagenes: [
      {
        id: "img-6",
        url: "/images/propiedades/local-comercial.jpg",
        alt: "Local comercial avenida",
        thumbnailURL: "/images/propiedades/local-comercial-thumb.jpg"
      }
    ],
    caracteristicas: [
      "Ubicación estratégica",
      "Alto flujo peatonal",
      "Dos baños",
      "Bodega de almacenamiento",
      "Vitrina amplia",
      "Conexiones eléctricas"
    ],
    slug: "local-comercial-avenida",
    destacado: false,
    estado: "DISPONIBLE",
    createdAt: "2025-01-18T10:00:00Z",
    updatedAt: "2025-01-18T10:00:00Z"
  }
];
