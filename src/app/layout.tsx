import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'  // Importa el Footer
import { ReactNode } from 'react'


export const metadata = {
  title: 'AR Company',
  description: 'Firma legal especializada en servicios jurídicos integrales',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />  
      </body>
    </html>
  )
}