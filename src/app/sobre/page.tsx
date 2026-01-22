import type { Metadata } from 'next';
import { Music, MapPin, Wifi, Armchair, Target, Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Sobre Nós - Centro Cultural Maestro Levi',
    description: 'Conheça a história e os valores que fazem do Centro Cultural Maestro Levi uma referência em ensino musical.',
};


export default function Sobre() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Hero Section */}
            <section className="bg-ccml-dark text-white py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507838153414-b4b713384ebd?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/90"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in font-serif tracking-wide">Quem Somos</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        Conheça a história e os valores que fazem do Centro Cultural Maestro Levi uma referência em ensino musical.
                    </p>
                    <div className="h-1 w-32 bg-ccml-gold mx-auto rounded-full"></div>
                </div>
            </section>

            {/* Maestro Bio Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative animate-fade-in-left group">
                        <div className="rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                            <Image 
                                src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80" 
                                alt="Maestro Levi" 
                                width={600}
                                height={800}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="absolute top-10 -left-10 w-full h-full bg-ccml-gold/10 rounded-2xl z-0 hidden lg:block"></div>
                        <div className="absolute -bottom-8 -right-8 bg-ccml-gold text-ccml-darker p-8 rounded-xl shadow-xl hidden lg:block z-20">
                            <span className="block text-4xl font-bold font-serif">20+ Anos</span>
                            <span className="text-sm font-bold uppercase tracking-widest">de Experiência</span>
                        </div>
                    </div>
                    
                    <div className="space-y-8 animate-fade-in-right">
                        <h2 className="text-4xl font-bold text-ccml-darker font-serif border-l-4 border-ccml-gold pl-6">O Maestro Levi</h2>
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify">
                            <p>A nossa história nasceu de uma convicção familiar: a de que a arte e a educação transformam vidas. Ela nasce em São Paulo, no coração de um homem que, embora tenha seguido o caminho da fé como pastor, carregava a música no sangue.</p>
                            <p>Enquanto seus irmãos seguiam carreira como músicos militares, Levi dos Santos escolheu cuidar de pessoas. Mas a arte nunca o deixou. Com um clarinete nas mãos e uma vocação natural para liderar, ele começou a reger corais e vozes, ganhando carinhosamente o título que hoje dá nome à nossa escola: Maestro Levi.</p>
                            <p>Na direção de seus filhos Levi Abraão, Levi Isaque e Nagen Levi, o Centro Cultural Maestro Levi não forma apenas artistas; forma seres humanos pensantes, saudáveis e disciplinados, exatamente como o nosso pai nos ensinou.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Structure Section */}
            <section className="bg-white py-24 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-ccml-dark text-ccml-gold rounded-full mb-6 shadow-lg">
                            <Music size={40} />
                        </div>
                        <h2 className="text-4xl font-bold text-ccml-darker mb-6 font-serif">Nossa Estrutura</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            O Centro Cultural Maestro Levi foi projetado para inspirar. Nossas salas são acusticamente tratadas, climatizadas e equipadas com instrumentos de alta qualidade.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { icon: MapPin, title: "Localização Central", desc: "Fácil acesso para todos, no coração da cidade." },
                            { icon: Wifi, title: "Conectividade", desc: "Wi-Fi de alta velocidade disponível para alunos e pais." },
                            { icon: Armchair, title: "Conforto", desc: "Área de espera acolhedora e climatizada para sua família." }
                        ].map((item, index) => (
                            <div key={index} className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group text-center">
                                <div className="w-16 h-16 bg-white text-ccml-dark group-hover:bg-ccml-gold group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transition-colors duration-300">
                                    <item.icon size={32} />
                                </div>
                                <h4 className="font-bold text-xl mb-3 text-ccml-darker">{item.title}</h4>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

                            {/* Pillars Section */}
                <section className="py-24 px-6 bg-ccml-darker text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#c7a557_1px,transparent_1px)] bg-size-[16px_16px]"></div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold text-center mb-16 font-serif drop-shadow-lg">Nossos Pilares</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Target, title: "Missão", desc: "Transformar vidas através da educação musical, formando cidadãos sensíveis, disciplinados e criativos." },
                        { icon: Eye, title: "Visão", desc: "Ser reconhecido como o principal centro de referência em ensino de música e artes da região." },
                        { icon: Heart, title: "Valores", desc: "Ética, Excelência, Respeito, Inovação e Paixão pelo que fazemos." }
                    ].map((item, index) => (
                        <div key={index} className="group relative bg-ccml-dark/90 backdrop-blur-sm p-10 rounded-2xl border border-gray-800/50 shadow-xl hover:shadow-2xl hover:border-ccml-gold/80 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                        <div className="absolute top-4 -right-4 w-20 h-20 bg-ccml-gold/10 rounded-2xl -rotate-12 opacity-50 group-hover:opacity-100 transition-all"></div>
                        
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl text-ccml-gold shadow-lg group-hover:bg-ccml-gold group-hover:text-ccml-darker group-hover:shadow-ccml-gold transition-all duration-300 shrink-0">
                            <item.icon size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-bold font-serif text-white">{item.title}</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed group-hover:text-white font-light relative z-10"> 
                            {item.desc}
                        </p>
                        </div>
                    ))}
                    </div>
                </div>
                </section>

            <Footer />
        </div>
    );
}
