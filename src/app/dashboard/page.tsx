import { BookOpen, Clock, Award, PlayCircle, Calendar } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1d2330] font-playfair">
          Olá, Aluno! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Bem-vindo ao seu painel de aprendizado. Aqui está o resumo do seu progresso.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Aulas Concluídas", value: "12", icon: BookOpen, color: "bg-blue-500", textColor: "text-blue-500" },
          { label: "Horas Estudadas", value: "24h", icon: Clock, color: "bg-green-500", textColor: "text-green-500" },
          { label: "Certificados", value: "1", icon: Award, color: "bg-[#c7a557]", textColor: "text-[#c7a557]" },
          { label: "Próxima Aula", value: "Hoje", icon: PlayCircle, color: "bg-purple-500", textColor: "text-purple-500" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center ${stat.textColor}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1d2330]">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Next Class */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Next Class Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#1d2330] mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-[#c7a557]" />
            Próxima Aula
          </h2>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-[#1d2330]">Teoria Musical Avançada</h3>
                <p className="text-sm text-gray-500">Prof. Carlos Silva</p>
              </div>
              <span className="bg-[#c7a557] text-[#1d2330] text-xs font-bold px-2 py-1 rounded">
                14:00
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
              <Clock size={16} />
              <span>45 minutos</span>
            </div>
            <button className="w-full mt-4 bg-[#1d2330] text-white py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors">
              Entrar na Sala Virtual
            </button>
          </div>
        </div>

        {/* Recent Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#1d2330] mb-4">Progresso Recente</h2>
          <div className="space-y-4">
            {[
              { title: "Escalas Maiores", progress: 100, date: "Ontem" },
              { title: "Harmonia Funcional", progress: 75, date: "2 dias atrás" },
              { title: "Leitura Rítmica", progress: 30, date: "Semana passada" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.title}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-[#c7a557] h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}