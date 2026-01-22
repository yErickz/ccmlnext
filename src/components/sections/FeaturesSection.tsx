"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Users, Award, Clock, Scroll, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Desconecta após a primeira animação
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Music2 className="w-8 h-8 text-[#c7a557]" />,
      title: "Ensino de Qualidade",
      desc: "Metodologia própria que combina tradição e inovação para cada aluno.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#c7a557]" />,
      title: "Professores Experientes",
      desc: "Equipe de profissionais qualificados e apaixonados pela arte.",
    },
    {
      icon: <Award className="w-8 h-8 text-[#c7a557]" />,
      title: "Excelência Reconhecida",
      desc: "Formando pessoas talentosos com técnica e sensibilidade.",
    },
    {
      icon: <Scroll className="w-8 h-8 text-[#c7a557]" />,
      title: "Certificação",
      desc: "Certificados reconhecidos para cada etapa concluída.",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#c7a557]" />,
      title: "Horários Flexíveis",
      desc: "Aulas em diversos horários para se adequar à sua rotina.",
    },
    {
      icon: <Heart className="w-8 h-8 text-[#c7a557]" />,
      title: "Ambiente Acolhedor",
      desc: "Salas climatizadas e ambientes temáticos pensados para inspirar e envolver cada aluno em uma atmosfera calorosa e receptiva.",
    },
  ];

  return (
    <section className="py-20 px-5 md:px-[5%] bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ccml-dark mb-4">
            Por que escolher o CCML?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Um centro de excelência onde tradição e inovação se encontram.
          </p>
          <div className="w-20 h-1 bg-[#c7a557] mx-auto mt-6" />
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`bg-gray-50 border-gray-100 text-center group transition-all duration-700 ease-out hover:shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="w-16 h-16 bg-ccml-dark rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}