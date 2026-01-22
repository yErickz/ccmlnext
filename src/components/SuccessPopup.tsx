"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface SuccessPopupProps {
  isOpen: boolean;
}

export default function SuccessPopup({ isOpen }: SuccessPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl p-8 md:p-10 max-w-md w-full text-center shadow-2xl border border-gray-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 font-playfair">
              Matrícula Enviada!
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Recebemos seus dados com sucesso. Nossa equipe entrará em contato em breve para confirmar sua matrícula.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-ccml-gold text-white rounded-xl font-medium hover:bg-[#b08d45] transition-all shadow-lg shadow-ccml-gold/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Voltar ao Início
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}