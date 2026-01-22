"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Music, User, LogIn } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Início", href: "/", icon: Home },
    { name: "Matrícula", href: "/matricula", icon: Music },
    { name: "Área do Aluno", href: "/dashboard", icon: User },
    { name: "Login", href: "/login", icon: LogIn },
  ];

  return (
    <>
      {/* Botão Mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-ccml-gold text-white rounded-md md:hidden shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Container Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-ccml-dark text-white w-64 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-xl border-r border-gray-800`}
      >
        <div className="p-6 text-center border-b border-gray-800">
          <h1 className="text-2xl font-bold text-ccml-gold tracking-wider">CCML</h1>
          <p className="text-xs text-gray-400 mt-1">Centro Cultural Maestro Levi</p>
        </div>

        <nav className="mt-8 flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-ccml-gold transition-all group"
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}