"use client";

import { useEffect, useState, useRef } from "react";

const AnimatedStat = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const duration = 2000;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
              // Ease out quart
              const val = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(val * end));
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default function StatsStrip() {
  return (
    <div className="bg-ccml-dark py-14 px-8 md:px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-white text-center">
        
        {/* 1º stat */}
        <div className="stat-item">
          <div className="text-4xl md:text-[2.5rem] font-bold text-[#c7a557] mb-2 font-playfair">
            <AnimatedStat end={5} suffix="+" />
          </div>
          <div className="text-sm md:text-base opacity-80">Anos de História</div>
        </div>

        {/* 2º stat */}
        <div className="stat-item">
          <div className="text-4xl md:text-[2.5rem] font-bold text-[#c7a557] mb-2 font-playfair">
            <AnimatedStat end={800} suffix="+" />
          </div>
          <div className="text-sm md:text-base opacity-80">Alunos Formados</div>
        </div>

        {/* 3º stat */}
        <div className="stat-item">
          <div className="text-4xl md:text-[2.5rem] font-bold text-[#c7a557] mb-2 font-playfair">
            <AnimatedStat end={6} />
          </div>
          <div className="text-sm md:text-base opacity-80">Professores Experts</div>
        </div>
      </div>
    </div>
  );
}