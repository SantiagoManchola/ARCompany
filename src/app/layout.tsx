import './globals.css'
import Header from '@/components/Header'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Mi Sitio',
  description: 'Una página con Next.js y Tailwind',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto">{children}</main>
      </body>
    </html>
  )
}
