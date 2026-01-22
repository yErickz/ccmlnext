import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative pt-20 pb-8 flex items-center justify-center text-center overflow-hidden min-h-[80vh] bg-linear-to-b from-white via-gray-50 to-gray-100">
      {/* Conteúdo */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 bg-[#c7a557]/10 text-[#c7a557] rounded-full text-sm font-bold mb-8 uppercase tracking-widest border border-[#c7a557]/20">
          Centro Cultural Maestro Levi
        </span>

        {/* Título */}
        <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-bold text-ccml-dark leading-[1.1] mb-6 font-['Playfair_Display',serif]">
          Sua Jornada Musical <br />
          <span className="text-[#c7a557]">Começa Aqui</span>
        </h1>

        {/* Descrição */}
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
          Descubra o equilíbrio perfeito entre técnica, emoção e criatividade
          no centro cultural mais completo da região.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/matricula"
            className="inline-flex items-center justify-center gap-2 bg-[#c7a557] text-black px-8 py-4 rounded-full font-bold text-base hover:bg-[#b08d45] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#c7a557]/20"
          >
            Matricule-se Agora
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/valores"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-[#1d2330] text-ccml-dark font-bold text-base hover:bg-[#1d2330] hover:text-white transition-all duration-300"
          >
            Ver Valores
          </Link>
        </div>
      </div>
    </header>
  );
}