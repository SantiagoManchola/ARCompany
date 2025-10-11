"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Nosotros" },
  { href: "/services", label: "Servicios" },
  { href: "/bienes-raices", label: "Bienes Raíces" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 shadow-lg h-[10vh] min-h-[80px]">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex justify-between items-center h-full px-1">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-0">
              <Image
                src="/images/Logo AR COMPANY.png"
                alt="Logo"
                width={90}
                height={90}
                className="rounded"
              />
              <div className="">
                <Image
                  src="/images/Logo BYJ.png"
                  alt="Logo"
                  width={200}
                  height={100}
                  className="rounded"
                />
              </div>
            </Link>
          </div>

          {/* Navigation, Contact Button & Mobile Menu - Right Side */}
          <div className="flex items-center">
            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8 mr-8">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "text-normal font-medium transition-colors duration-200 hover:text-amber-300",
                    pathname === href ? "text-amber-300" : "text-gray-100"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Contact Button - Desktop */}
            <Link
              href="/contact"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 hidden md:inline-flex items-center"
            >
              Contacto
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200"
              aria-label="Abrir menú"
            >
              <svg
                className={clsx(
                  "h-6 w-6 transition-transform duration-300",
                  isOpen && "rotate-90"
                )}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={clsx(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800 rounded-lg mt-2 mb-2">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  pathname === href
                    ? "bg-amber-500 text-slate-900"
                    : "text-gray-300 hover:text-white hover:bg-slate-700"
                )}
              >
                {label}
              </Link>
            ))}
            {/* Mobile Contact Button */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-900 px-3 py-2 rounded-md text-sm font-semibold mt-4 transition-colors duration-200"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}