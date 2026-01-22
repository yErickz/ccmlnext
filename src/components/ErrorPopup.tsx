"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XCircle } from "lucide-react";

interface ErrorPopupProps {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
}

export default function ErrorPopup({ isOpen, message, onClose }: ErrorPopupProps) {
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
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 font-playfair">
              Atenção
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {message || "Por favor, verifique os dados informados e tente novamente."}
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Entendi
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}