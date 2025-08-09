// Tipos para la respuesta de servicios de la API
export interface ServiceAPI {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  descripcion_general: string;
  slug: string;
  descripcion: string;
  titulo_banner: string;
  descripcion_banner: string;
  imagen_banner: {
    createdAt: string;
    updatedAt: string;
    alt: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    focalX: number;
    focalY: number;
    id: string;
    url: string;
    thumbnailURL: string | null;
  };
  areas_especializacion: Array<{
    area: string;
    id: string;
  }>;
  icon?: {
    id: string;
    url: string;
    alt?: string;
    filename?: string;
    mimeType?: string;
    filesize?: number;
    width?: number;
    height?: number;
    thumbnailURL?: string | null;
  };
  title?: string;
  href?: string;
}

// Tipos para la respuesta de noticias de la API
export interface NewsAPI {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  description: string;
  // Contenido puede venir en varios formatos: HTML string, array de nodos rich text
  // o estructuras estilo Payload (root/children). Tipado flexible pero sin 'any'.
  contenido: RichTextContent;
  backgroundImage: {
    createdAt: string;
    updatedAt: string;
    alt: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    focalX: number;
    focalY: number;
    id: string;
    url: string;
    thumbnailURL: string | null;
  };
  publishedAt: string;
}

// Tipo para el formato actual de servicesData
export interface ServiceData {
  d: ServiceAPI;
  icon: string;
  title: string;
  description: string;
  descripcion_general: string;
  href: string;
}

// Tipo para el formato de newsData (equivalente a NewsItem)
export interface NewsData {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  date: string;
  link: string;
}

// Tipo genérico para respuestas de la API
export interface APIResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
  error?: string;
}

// Tipo específico para la respuesta de servicios (respuesta directa de la API)
export interface ServiciosAPIResponse {
  docs: ServiceAPI[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// =====================
// Rich Text Types (Noticias)
// =====================
export interface RichTextTextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface RichTextParentBase {
  children?: RichTextNode[];
}

export interface ParagraphNode extends RichTextParentBase {
  type: "paragraph";
}
export interface HeadingNode extends RichTextParentBase {
  type: "heading";
  tag?: 1 | 2 | 3 | 4 | 5 | 6;
}
export interface ListNode extends RichTextParentBase {
  type: "list";
  listType?: "ordered" | "unordered";
}
export interface BlockquoteNode extends RichTextParentBase {
  type: "blockquote";
}
export interface ListItemNode extends RichTextParentBase {
  type?: "list-item" | "listItem";
}

export type RichTextNode =
  | RichTextTextNode
  | ParagraphNode
  | HeadingNode
  | ListNode
  | BlockquoteNode
  | ListItemNode;

// Estructuras envoltorio que puede devolver el CMS
export interface RichTextRootWrapper {
  root: { children: RichTextNode[] };
}
export interface RichTextChildrenWrapper {
  children: RichTextNode[];
}

// Unión final aceptada en NewsAPI.contenido
export type RichTextContent =
  | string // HTML simple
  | RichTextNode[]
  | RichTextRootWrapper
  | RichTextChildrenWrapper;

// Tipo específico para la respuesta de noticias (respuesta directa de la API)
export interface NoticiasAPIResponse {
  docs: NewsAPI[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Configuración de la API
export interface APIConfig {
  baseURL: string;
  timeout?: number;
}
