import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/Footer";
import Stats from "@/components/sections/Stats";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MaestroAI from "@/components/MaestroAI";
import InstrumentsSection from "@/components/sections/InstrumentsSection";
import Button from "@/components/ui/Button";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturesSection />
      <InstrumentsSection />

      {/* Seção CTA (Matrículas Abertas) */}
      <section className="py-20 bg-ccml-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Matrículas Abertas!
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Garanta sua vaga e comece a transformar sua paixão em música hoje
            mesmo.
          </p>
          <Button
            href="/matricula"
            size="lg"
            className="px-10 text-lg hover:bg-white"
          >
            Preencher Ficha de Matrícula
          </Button>
        </div>
      </section>

      <Footer />
      <MaestroAI />
    </main>
  );
}
