import { notFound } from "next/navigation";
import { apiService } from "@/services/api";
import { NewsAPI } from "@/types/api";
import { Metadata } from "next";
import NewsJsonLd from "@/components/seo/NewsJsonLd";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

// Función para generar metadata dinámico para SEO
export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const noticia = await apiService.getNoticiaBySlug(slug);

    if (!noticia) {
      return {
        title: "Noticia no encontrada",
        description: "La noticia solicitada no existe.",
      };
    }

    return {
      title: `${noticia.title} | AR Company`,
      description: noticia.description,
      openGraph: {
        title: noticia.title,
        description: noticia.description,
        images: [
          {
            url: noticia.backgroundImage.url,
            width: noticia.backgroundImage.width,
            height: noticia.backgroundImage.height,
            alt: noticia.backgroundImage.alt,
          },
        ],
        type: "article",
        siteName: "AR Company",
        publishedTime: noticia.publishedAt,
      },
      twitter: {
        card: "summary_large_image",
        title: noticia.title,
        description: noticia.description,
        images: [noticia.backgroundImage.url],
      },
      alternates: {
        canonical: `/news/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "Error al cargar la noticia.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const noticias = await apiService.getNoticias();
    return noticias.map((noticia) => ({
      slug: noticia.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Función para renderizar el contenido correctamente según su tipo
const renderContent = (contenido: any) => {
  // Si es un string HTML, lo renderizamos directamente
  if (typeof contenido === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: contenido }} />;
  }
  
  // Si es un objeto de Payload CMS (rich text)
  if (typeof contenido === 'object' && contenido !== null) {
    // Si tiene la estructura de Payload rich text
    if (Array.isArray(contenido)) {
      return renderPayloadRichText(contenido);
    }
    
    // Si es un objeto con propiedades específicas de Payload
    if (contenido.root && contenido.root.children) {
      return renderPayloadRichText(contenido.root.children);
    }
    
    // Si tiene children directamente
    if (contenido.children) {
      return renderPayloadRichText(contenido.children);
    }
    
    // Fallback: convertir a string
    return <div>{JSON.stringify(contenido, null, 2)}</div>;
  }
  
  return <div>Contenido no disponible</div>;
};

// Función para renderizar rich text de Payload CMS
const renderPayloadRichText = (children: any[]): React.ReactElement => {
  return (
    <div>
      {children.map((node, index) => {
        if (!node) return null;
        
        switch (node.type) {
          case 'paragraph':
            return (
              <p key={index} className="mb-6 text-gray-800 leading-relaxed text-lg font-light tracking-wide">
                {node.children?.map((child: any, childIndex: number) => 
                  renderTextNode(child, childIndex)
                )}
              </p>
            );
            
          case 'heading':
            const headingLevel = node.tag || 2;
            switch (headingLevel) {
              case 1:
                return (
                  <h1 key={index} className="text-4xl font-black text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text mb-8 mt-12 tracking-tight">
                    {node.children?.map((child: any, childIndex: number) => 
                      renderTextNode(child, childIndex)
                    )}
                  </h1>
                );
              case 2:
                return (
                  <h2 key={index} className="text-3xl font-bold text-slate-800 mb-6 mt-10 relative">
                    <span className="relative z-10">
                      {node.children?.map((child: any, childIndex: number) => 
                        renderTextNode(child, childIndex)
                      )}
                    </span>
                    <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                  </h2>
                );
              case 3:
                return (
                  <h3 key={index} className="text-2xl font-semibold text-slate-700 mb-5 mt-8">
                    {node.children?.map((child: any, childIndex: number) => 
                      renderTextNode(child, childIndex)
                    )}
                  </h3>
                );
              case 4:
                return (
                  <h4 key={index} className="text-xl font-semibold text-slate-700 mb-4 mt-6">
                    {node.children?.map((child: any, childIndex: number) => 
                      renderTextNode(child, childIndex)
                    )}
                  </h4>
                );
              case 5:
                return (
                  <h5 key={index} className="text-lg font-medium text-slate-600 mb-4 mt-6">
                    {node.children?.map((child: any, childIndex: number) => 
                      renderTextNode(child, childIndex)
                    )}
                  </h5>
                );
              case 6:
                return (
                  <h6 key={index} className="text-base font-medium text-slate-600 mb-3 mt-5">
                    {node.children?.map((child: any, childIndex: number) => 
                      renderTextNode(child, childIndex)
                    )}
                  </h6>
                );
              default:
                return (
                  <h2 key={index} className="text-3xl font-bold text-slate-800 mb-6 mt-10 relative">
                    <span className="relative z-10">
                      {node.children?.map((child: any, childIndex: number) => 
                        renderTextNode(child, childIndex)
                      )}
                    </span>
                    <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                  </h2>
                );
            }
            
          case 'list':
            if (node.listType === 'ordered') {
              return (
                <ol key={index} className="mb-6 ml-8 space-y-2 list-none">
                  {node.children?.map((listItem: any, itemIndex: number) => (
                    <li key={itemIndex} className="relative pl-8 text-gray-800 leading-relaxed">
                      <span className="absolute left-0 top-0 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                        {itemIndex + 1}
                      </span>
                      {listItem.children?.map((child: any, childIndex: number) => 
                        renderTextNode(child, childIndex)
                      )}
                    </li>
                  ))}
                </ol>
              );
            } else {
              return (
                <ul key={index} className="mb-6 ml-8 space-y-2 list-none">
                  {node.children?.map((listItem: any, itemIndex: number) => (
                    <li key={itemIndex} className="relative pl-8 text-gray-800 leading-relaxed">
                      <span className="absolute left-0 top-2 w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full"></span>
                      {listItem.children?.map((child: any, childIndex: number) => 
                        renderTextNode(child, childIndex)
                      )}
                    </li>
                  ))}
                </ul>
              );
            }
            
          case 'blockquote':
            return (
              <blockquote key={index} className="relative mb-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-gradient-to-b from-amber-400 to-orange-500 rounded-r-lg">
                <div className="absolute top-4 left-4 text-amber-400 opacity-30">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <div className="relative italic text-slate-700 text-lg font-medium leading-relaxed pl-6">
                  {node.children?.map((child: any, childIndex: number) => 
                    renderTextNode(child, childIndex)
                  )}
                </div>
              </blockquote>
            );
            
          default:
            // Para nodos de texto o desconocidos
            if (node.text !== undefined) {
              return <span key={index}>{renderTextNode(node, index)}</span>;
            }
            return null;
        }
      })}
    </div>
  );
};

// Función para renderizar nodos de texto con formato
const renderTextNode = (node: any, index: number): React.ReactElement | string => {
  if (!node || node.text === undefined) return '';
  
  let text: React.ReactElement | string = node.text;
  
  if (node.bold) {
    text = <strong key={`bold-${index}`} className="font-semibold text-slate-900">{text}</strong>;
  }
  
  if (node.italic) {
    text = <em key={`italic-${index}`} className="italic text-slate-700">{text}</em>;
  }
  
  if (node.underline) {
    text = <u key={`underline-${index}`} className="underline decoration-amber-400 decoration-2 underline-offset-2">{text}</u>;
  }
  
  if (node.code) {
    text = <code key={`code-${index}`} className="bg-slate-100 text-slate-800 px-2 py-1 rounded-md font-mono text-sm border border-slate-200">{text}</code>;
  }
  
  return text;
};

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;

  let noticia: NewsAPI | null = null;

  try {
    noticia = await apiService.getNoticiaBySlug(slug);
  } catch (error) {
    console.error("Error fetching noticia:", error);
  }

  if (!noticia) {
    return notFound();
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <NewsJsonLd
        noticia={noticia}
        baseUrl={process.env.NEXT_PUBLIC_BASE_URL}
      />
      
      {/* Hero Section Mejorado */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background con parallax effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000"
          style={{
            backgroundImage: `url('${noticia.backgroundImage.url}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
          {/* Overlay pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          {/* Main Title con efecto llamativo */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
            <span className="block text-transparent bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text">
              {noticia.title}
            </span>
          </h1>

          {/* Meta info elegante */}
          <div className="flex items-center justify-center gap-6 text-white/80 mb-12">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{formatDate(noticia.publishedAt)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal con diseño magazine */}
      <section className="relative -mt-20 z-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Card principal con glassmorphism */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header del artículo */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Contenido del Artículo</h2>
                    <p className="text-white/70">Información detallada y análisis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido del artículo */}
            <div className="p-12">
              <div className="prose prose-xl max-w-none">
                <div className="rich-text-content">
                  {renderContent(noticia.contenido)}
                </div>
              </div>
            </div>

            {/* Footer del artículo */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-12 py-8 border-t border-slate-200">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Última actualización</p>
                    <span className="text-sm">{formatDate(noticia.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Espacio final */}
      <div className="h-32"></div>
    </main>
  );
}