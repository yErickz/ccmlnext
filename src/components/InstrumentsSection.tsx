"use client";

import { useEffect, useRef, useState } from "react";

const instruments = [
  "Baixo", "Bateria", "Canto / Técnica Vocal", "Dança", 
  "Flauta Doce", "Inglês com Música", "Musicalização Infantil", 
  "Percussão", "Piano / Teclado", "Teatro", "Violão", "Violino"
];

export default function InstrumentsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ccml-dark mb-4 font-playfair">
            Cursos Disponíveis
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Escolha a arte que faz seu coração vibrar.
          </p>
        </div>

        {/* Tags */}
        <div 
          ref={containerRef}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {instruments.map((instrument, index) => (
            <span
              key={index}
              className={`px-6 py-3 bg-white border border-gray-200 rounded-full 
                text-sm font-medium text-gray-800 hover:border-[#c7a557] 
                hover:text-[#c7a557] hover:scale-105 shadow-sm 
                transition-all duration-500 cursor-default whitespace-nowrap
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {instrument}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}