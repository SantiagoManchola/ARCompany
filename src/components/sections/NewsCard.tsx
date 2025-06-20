"use client";
import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "@/data/news";

interface NewsCardProps {
  item: NewsItem;
  width: number;
  height: number;
}

export default function NewsCard({ item, width, height }: NewsCardProps) {
  return (
    <Link 
      href={item.link} 
      className="block rounded-2xl overflow-hidden group relative transform transition-all duration-500 hover:scale-105 hover:shadow-2xl flex-shrink-0"
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        top: '12px',
        left: '8px'
      }}
    >
      {/* Imagen con mejor handling */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={item.backgroundImage}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-100"
          sizes={`${width}px`}
        />
        
        {/* Gradiente mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
        
        {/* Overlay decorativo */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Contenido mejorado */}
      <div className="absolute bottom-0 left-0 -right-0 p-5 text-white">
        {/* Title */}
        <h3 className="font-bold text-white leading-tight transform translate-y-0 group-hover:-translate-y-26 transition-all duration-300 text-xl mb-2">
          {item.title}
        </h3>
      </div>
        
      {/* Description */}
      <div className="absolute bottom-0 left-0 -right-0 p-5 text-white">  
        <p className="text-gray-200 text-[13px] leading-normal opacity-0 group-hover:opacity-100 transform translate-y-0 group-hover:translate-y-0 transition-all duration-300 delay-100">
          {item.description}
        </p>
        
        {/* Date */}
        <div className="flex items-center gap-1 mt-3 text-xs text-amber-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {item.date}
        </div>
      </div>
      
      {/* Hover border effect */}
      <div className="absolute inset-1 border-2 group-hover:border-amber-400 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </Link>
  );
}