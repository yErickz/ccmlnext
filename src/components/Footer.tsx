import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1d2330] text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Centro Cultural Maestro Levi</h3>
            <p className="text-sm leading-relaxed mb-4">
              Transformando vidas através da arte.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#c7a557] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#c7a557] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#c7a557] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 hover:text-[#c7a557] transition-colors">
                <MapPin className="w-5 h-5 text-[#c7a557] shrink-0" />
                Rua da Música, 123 - Centro
              </li>
              <li>
                <a
                  href="https://wa.me/5594999999999"
                  className="flex items-center gap-3 hover:text-[#c7a557] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="w-5 h-5 text-[#c7a557] shrink-0" />
                  (94) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3 hover:text-[#c7a557] transition-colors">
                <Mail className="w-5 h-5 text-[#c7a557] shrink-0" />
                contato@ccml.com.br
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6">
          <p className="text-xs md:text-sm text-gray-400 text-center mx-auto max-w-md">
            &copy; {new Date().getFullYear()} Centro Cultural Maestro Levi.
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
