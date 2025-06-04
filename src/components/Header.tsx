'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/contact', label: 'Contacto' },
  { href: '/real-state', label: 'Bienes Raíces' },
  { href: '/services', label: 'Servicios' },
]

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Mi Sitio</h1>

        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>

        <nav className="hidden md:flex gap-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'text-gray-600 hover:text-black transition',
                pathname === href && 'font-semibold text-black underline'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)} 
              className={clsx(
                'text-gray-700 hover:text-black transition',
                pathname === href && 'font-semibold text-black underline'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
