import { notFound } from "next/navigation";
import { apiService } from "@/services/api";
import { NewsAPI } from "@/types/api";
import { Metadata } from "next";
import NewsJsonLd from "@/components/seo/NewsJsonLd";
import React from "react";
import Image from "next/image";

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

// =====================
// Tipos Rich Text (simplificados para esta vista)
// =====================
interface RichTextTextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

interface RichTextParentBase {
  children?: RichTextNode[];
}

interface ParagraphNode extends RichTextParentBase {
  type: "paragraph";
}
interface HeadingNode extends RichTextParentBase {
  type: "heading";
  tag?: 1 | 2 | 3 | 4 | 5 | 6;
}
interface ListNode extends RichTextParentBase {
  type: "list";
  listType?: "ordered" | "unordered";
}
interface BlockquoteNode extends RichTextParentBase {
  type: "blockquote";
}
// Algunos CMS usan list item explícito (por si acaso)
interface ListItemNode extends RichTextParentBase {
  type?: "list-item" | "listItem";
}

type RichTextNode =
  | RichTextTextNode
  | ParagraphNode
  | HeadingNode
  | ListNode
  | BlockquoteNode
  | ListItemNode;

// Type guards
const isTextNode = (node: RichTextNode): node is RichTextTextNode =>
  "text" in node && typeof (node as RichTextTextNode).text === "string";
const hasChildren = (node: RichTextNode): node is RichTextParentBase =>
  "children" in node;

// Renderizado de contenido genérico (entrada puede ser HTML string, array rich text, objeto con root, etc.)
const renderContent = (contenido: unknown): React.ReactElement => {
  if (typeof contenido === "string") {
    return <div dangerouslySetInnerHTML={{ __html: contenido }} />;
  }
  if (Array.isArray(contenido)) {
    return renderPayloadRichText(contenido as RichTextNode[]);
  }
  if (contenido && typeof contenido === "object") {
    const maybe = contenido as {
      children?: unknown;
      root?: { children?: unknown };
    };
    if (Array.isArray(maybe.children))
      return renderPayloadRichText(maybe.children as RichTextNode[]);
    if (maybe.root && Array.isArray(maybe.root.children))
      return renderPayloadRichText(maybe.root.children as RichTextNode[]);
    return <div>{JSON.stringify(contenido, null, 2)}</div>;
  }
  return <div>Contenido no disponible</div>;
};

// Renderizado del array de nodos Rich Text
const renderPayloadRichText = (
  children: RichTextNode[]
): React.ReactElement => (
  <div>
    {children.map((node, index) => {
      if (!node) return null;

      if (isTextNode(node)) {
        return <span key={index}>{renderTextNode(node, index)}</span>;
      }

      const nodeType = (
        node as
          | ParagraphNode
          | HeadingNode
          | ListNode
          | BlockquoteNode
          | ListItemNode
      ).type;
      switch (nodeType) {
        case "paragraph":
          return (
            <p
              key={index}
              className="mb-4 text-gray-700 leading-relaxed text-base"
            >
              {hasChildren(node) &&
                node.children?.map((child, childIndex) => (
                  <React.Fragment key={childIndex}>
                    {isTextNode(child)
                      ? renderTextNode(child, childIndex)
                      : null}
                  </React.Fragment>
                ))}
            </p>
          );
        case "heading": {
          const headingNode = node as HeadingNode;
          const level = headingNode.tag || 2;
          const common = (cls: string, tagName: string) =>
            React.createElement(
              tagName,
              { key: index, className: cls },
              headingNode.children?.map((child, childIndex) => (
                <React.Fragment key={childIndex}>
                  {isTextNode(child) ? renderTextNode(child, childIndex) : null}
                </React.Fragment>
              ))
            );
          switch (level) {
            case 1:
              return common("text-3xl font-bold text-gray-900 mb-6 mt-8", "h1");
            case 2:
              return common(
                "text-2xl font-semibold text-gray-800 mb-4 mt-6",
                "h2"
              );
            case 3:
              return common(
                "text-xl font-medium text-gray-800 mb-3 mt-5",
                "h3"
              );
            case 4:
              return common(
                "text-lg font-medium text-gray-700 mb-3 mt-4",
                "h4"
              );
            case 5:
              return common(
                "text-base font-medium text-gray-700 mb-2 mt-4",
                "h5"
              );
            case 6:
              return common(
                "text-sm font-medium text-gray-700 mb-2 mt-3",
                "h6"
              );
            default:
              return common(
                "text-2xl font-semibold text-gray-800 mb-4 mt-6",
                "h2"
              );
          }
        }
        case "list": {
          const listNode = node as ListNode;
          const ordered = listNode.listType === "ordered";
          const tagName = ordered ? "ol" : "ul";
          const listClasses = ordered
            ? "mb-4 ml-6 space-y-1 list-decimal list-outside"
            : "mb-4 ml-6 space-y-1 list-disc list-outside";
          return React.createElement(
            tagName,
            { key: index, className: listClasses },
            listNode.children?.map((li, liIndex) => (
              <li key={liIndex} className="text-gray-700 leading-relaxed">
                {hasChildren(li) &&
                  li.children?.map((child, childIndex) => (
                    <React.Fragment key={childIndex}>
                      {isTextNode(child)
                        ? renderTextNode(child, childIndex)
                        : null}
                    </React.Fragment>
                  ))}
              </li>
            ))
          );
        }
        case "blockquote":
          return (
            <blockquote
              key={index}
              className="mb-6 pl-4 border-l-4 border-gray-300 italic text-gray-600 bg-gray-50 py-3 px-4 rounded-r"
            >
              {hasChildren(node) &&
                node.children?.map((child, childIndex) => (
                  <React.Fragment key={childIndex}>
                    {isTextNode(child)
                      ? renderTextNode(child, childIndex)
                      : null}
                  </React.Fragment>
                ))}
            </blockquote>
          );
        default:
          return null;
      }
    })}
  </div>
);

// Renderizado de un nodo de texto con formato
const renderTextNode = (
  node: RichTextTextNode,
  index: number
): React.ReactElement => {
  let text: React.ReactElement = <>{node.text}</>;
  if (node.bold)
    text = (
      <strong key={`b-${index}`} className="font-semibold">
        {text}
      </strong>
    );
  if (node.italic)
    text = (
      <em key={`i-${index}`} className="italic">
        {text}
      </em>
    );
  if (node.underline)
    text = (
      <u key={`u-${index}`} className="underline">
        {text}
      </u>
    );
  if (node.code)
    text = (
      <code
        key={`c-${index}`}
        className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-sm"
      >
        {text}
      </code>
    );
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
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <NewsJsonLd
        noticia={noticia}
        baseUrl={process.env.NEXT_PUBLIC_BASE_URL}
      />

      {/* Contenedor principal clásico */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Título principal */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {noticia.title}
          </h1>

          {/* Metadatos del artículo */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Publicado el {formatDate(noticia.publishedAt)}</span>
            </div>
          </div>
        </header>

        {/* Imagen principal */}
        <figure className="mb-8">
          <Image
            src={noticia.backgroundImage.url}
            alt={noticia.backgroundImage.alt}
            width={noticia.backgroundImage.width}
            height={noticia.backgroundImage.height}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </figure>

        {/* Contenido principal */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed">
            {renderContent(noticia.contenido)}
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200 text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            <span>Actualizado el {formatDate(noticia.updatedAt)}</span>
          </div>
        </footer>
      </article>
    </main>
  );
}
