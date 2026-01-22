"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Music } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 flex justify-between items-center px-[5%] py-3.75 bg-[hsla(220,20%,20%,0.85)] backdrop-blur-md border-b border-white/5 text-white z-1000 w-full transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="flex items-center gap-2 max-w-[80%]">
        <div className="w-10 h-10 bg-ccml-gold rounded-full flex items-center justify-center text-[#151922] shrink-0">
          <Music size={24} />
        </div>
        <span className="text-2xl font-bold text-ccml-gold tracking-[1px] font-['Playfair_Display',serif] leading-[1.2]">
          Centro Cultural Maestro Levi
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex list-none gap-7.5 items-center">
        <Link href="/" className="text-ccml-gold hover:text-yellow-500 transition-colors">Início</Link>
        <Link href="/sobre" className="hover:text-ccml-gold transition-colors">Sobre</Link>
        <Link href="/matricula" className="hover:text-ccml-gold transition-colors">Matrícula</Link>
        <Link href="/valores" className="hover:text-ccml-gold transition-colors">Valores</Link>
        <Link href="/login" className="text-ccml-gold border-2 border-ccml-gold hover:bg-ccml-gold hover:text-[#151922] px-6 py-2.5 rounded-md text-base font-bold transition-colors">
          Área do Professor
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
        >
          <div className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-[hsla(220,20%,20%,0.95)] backdrop-blur-md border-b border-gray-800 md:hidden flex flex-col shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 space-y-4">
          <Link href="/" className="text-ccml-gold block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Início</Link>
          <Link href="/sobre" className="text-gray-300 hover:text-ccml-gold block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Sobre</Link>
          <Link href="/matricula" className="text-gray-300 hover:text-ccml-gold block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Matrícula</Link>
          <Link href="/valores" className="text-gray-300 hover:text-ccml-gold block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Valores</Link>
          <Link href="/login" className="text-ccml-gold border-2 border-ccml-gold hover:bg-ccml-gold hover:text-[#151922] block px-3 py-3 rounded-md text-base font-bold mt-4 text-center" onClick={() => setIsOpen(false)}>Área do Professor</Link>
        </div>
      </div>
    </nav>
  );
}
