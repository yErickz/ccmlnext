"use client"; // Necessário pois usa estado e interatividade

import { useState, useRef, useEffect } from "react";
import { Wand2, X, Minus, Trash2, Send } from "lucide-react"; // Ícones modernos

export default function MaestroAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: "Olá! Sou a IA do Centro Cultural Maestro Levi. 🎵 Posso te ajudar a escolher um instrumento ou tirar dúvidas sobre os cursos." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");
    setIsLoading(true);

    // Simulação de resposta (Lógica do antigo maestro-ui.js)
    let reply = "";
    const lowerText = userText.toLowerCase();

    await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay

    if (lowerText.match(/preço|valor|quanto custa|mensalidade/)) {
      reply = "Nossos planos começam a partir de R$ 189,90 mensais.";
    } else if (lowerText.match(/matricula|inscrever/)) {
      reply = "As matrículas estão abertas! Você pode se inscrever pelo menu 'Matrícula'.";
    } else {
      reply = "Que interessante! Para essa dúvida específica, recomendo falar com nossa secretaria no WhatsApp.";
    }

    setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-ccml-gold text-white px-4 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all flex items-center gap-2 z-50"
      >
        <Wand2 size={20} /> Fale com o Maestro IA
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl z-50 overflow-hidden transition-all duration-300 ${isMinimized ? 'w-72 h-14' : 'w-80 h-96'} flex flex-col`}>
      {/* Header */}
      <div className="bg-ccml-dark text-ccml-gold p-3 flex justify-between items-center">
        <span className="font-bold text-sm flex items-center gap-2"><Wand2 size={16}/> Maestro Virtual</span>
        <div className="flex gap-2 text-white">
          <button onClick={() => setMessages([])} title="Limpar"><Trash2 size={14} /></button>
          <button onClick={() => setIsMinimized(!isMinimized)}><Minus size={14} /></button>
          <button onClick={() => setIsOpen(false)}><X size={14} /></button>
        </div>
      </div>

      {/* Chat Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-lg text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-ccml-gold text-white ml-auto' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-1 p-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida..."
              className="flex-1 text-sm border rounded px-2 py-1 focus:outline-none focus:border-ccml-gold text-black"
            />
            <button onClick={handleSend} className="text-ccml-gold hover:text-yellow-600">
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
