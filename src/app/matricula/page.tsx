"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Music, Heart, DollarSign, ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuccessPopup from "@/components/SuccessPopup";
import ErrorPopup from "@/components/ErrorPopup";

const steps = [
  { id: 1, title: "Identificação", icon: User },
  { id: 2, title: "Financeiro", icon: FileText },
  { id: 3, title: "Curso", icon: Music },
  { id: 4, title: "Saúde", icon: Heart },
  { id: 5, title: "Plano", icon: DollarSign },
];

const instruments = [
  { value: "piano", label: "Piano / Teclado" },
  { value: "violao", label: "Violão" },
  { value: "violino", label: "Violino" },
  { value: "bateria", label: "Bateria" },
  { value: "canto", label: "Canto / Técnica Vocal" },
  { value: "flauta", label: "Flauta Doce" },
  { value: "ingles", label: "Inglês com Música" },
  { value: "musicalizacao", label: "Musicalização Infantil" },
];

const plans = [
  { value: "turma", title: "Aula em Turma", price: "189,90", description: "Aprendizado em grupo" },
  { value: "individual", title: "Aula Individual", price: "250,00", description: "Foco exclusivo" },
  { value: "musicalizacao", title: "Musicalização Infantil", price: "199,90", description: "Até 6 anos" },
  { value: "ingles", title: "Inglês com Música", price: "250,00", description: "Aprenda tocando" },
];

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const shifts = ["Manhã", "Tarde", "Noite"];

export default function MatriculaPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSameResponsible, setIsSameResponsible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedShifts, setSelectedShifts] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    telefone: "",
    endereco: "",
    email: "",
    nomeResponsavel: "",
    cpfResponsavel: "",
    whatsappResponsavel: "",
    diaVencimento: "05",
    curso: "",
    nivel: "iniciante",
    instrumentoProprio: "nao",
    objetivo: "",
    necessidades: "",
    autorizaImagem: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleShift = (shift: string) => {
    setSelectedShifts((prev) =>
      prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift]
    );
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.nome || !formData.cpf || !formData.telefone) {
          setErrorMessage("Por favor, preencha os campos obrigatórios (Nome, CPF, WhatsApp).");
          setIsError(true);
          return false;
        }
        return true;
      case 2:
        if (!isSameResponsible && (!formData.nomeResponsavel || !formData.cpfResponsavel)) {
          setErrorMessage("Por favor, preencha os dados do responsável financeiro.");
          setIsError(true);
          return false;
        }
        return true;
      case 3:
        if (!formData.curso) {
          setErrorMessage("Por favor, selecione um instrumento/curso.");
          setIsError(true);
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      plano: selectedPlan,
      diasDisponiveis: selectedDays,
      turnosDisponiveis: selectedShifts,
      responsavelFinanceiro: isSameResponsible ? "O próprio aluno" : formData.nomeResponsavel,
    };

    console.log("Dados da matrícula:", finalData);
    // Aqui você enviaria 'finalData' para sua API

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SuccessPopup isOpen={isSubmitted} />
      <ErrorPopup isOpen={isError} message={errorMessage} onClose={() => setIsError(false)} />
      <Navbar />

      <div className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-ccml-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-ccml-gold" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">
                Ficha de Matrícula
              </h1>
              <p className="text-gray-500">
                Preencha os dados abaixo para iniciar sua jornada musical no Centro Cultural Maestro Levi.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      step.id <= currentStep ? "text-ccml-gold" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${
                        step.id < currentStep
                          ? "bg-ccml-gold text-white"
                          : step.id === currentStep
                          ? "bg-ccml-gold/20 text-ccml-gold border-2 border-ccml-gold"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-ccml-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Identification */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 font-playfair">
                      <User className="w-5 h-5 text-ccml-gold" />
                      Identificação do Aluno
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input
                          id="nome"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          placeholder="Ex: João da Silva"
                          value={formData.nome}
                          onChange={(e) => handleInputChange("nome", e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                        <input
                          id="dataNascimento"
                          type="date"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          value={formData.dataNascimento}
                          onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                        <input
                          id="cpf"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange("cpf", e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                        <input
                          id="telefone"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          placeholder="(94) 99999-9999"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange("telefone", e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input
                          id="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          placeholder="exemplo@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
                        <input
                          id="endereco"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          placeholder="Rua, Número, Bairro"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange("endereco", e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Financial */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 font-playfair">
                      <FileText className="w-5 h-5 text-ccml-gold" />
                      Responsável Financeiro
                    </h3>

                    <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <input
                        type="checkbox"
                        id="sameResponsible"
                        className="h-4 w-4 rounded border-gray-300 text-ccml-gold focus:ring-ccml-gold"
                        checked={isSameResponsible}
                        onChange={(e) => setIsSameResponsible(e.target.checked)}
                      />
                      <label
                        htmlFor="sameResponsible"
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        O aluno é o responsável financeiro (Maior de 18 anos)
                      </label>
                    </div>

                    {!isSameResponsible && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="nomeResponsavel" className="block text-sm font-medium text-gray-700 mb-1">Nome do Responsável Financeiro</label>
                          <input
                            id="nomeResponsavel"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                            placeholder="Nome do pagador"
                            value={formData.nomeResponsavel}
                            onChange={(e) => handleInputChange("nomeResponsavel", e.target.value)}
                          />
                        </div>

                        <div>
                          <label htmlFor="cpfResponsavel" className="block text-sm font-medium text-gray-700 mb-1">CPF do Responsável</label>
                          <input
                            id="cpfResponsavel"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                            placeholder="000.000.000-00"
                            value={formData.cpfResponsavel}
                            onChange={(e) => handleInputChange("cpfResponsavel", e.target.value)}
                          />
                        </div>

                        <div>
                          <label htmlFor="whatsappResponsavel" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                          <input
                            id="whatsappResponsavel"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                            placeholder="(94) 99999-9999"
                            value={formData.whatsappResponsavel}
                            onChange={(e) => handleInputChange("whatsappResponsavel", e.target.value)}
                          />
                        </div>

                        <div>
                          <label htmlFor="diaVencimento" className="block text-sm font-medium text-gray-700 mb-1">Dia de Vencimento</label>
                          <select
                            id="diaVencimento"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                            value={formData.diaVencimento}
                            onChange={(e) => handleInputChange("diaVencimento", e.target.value)}
                          >
                            <option value="05">Dia 05</option>
                            <option value="10">Dia 10</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Course */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 font-playfair">
                      <Music className="w-5 h-5 text-ccml-gold" />
                      Dados do Curso
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor="curso" className="block text-sm font-medium text-gray-700 mb-1">Instrumento/Curso</label>
                        <select
                          id="curso"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          value={formData.curso}
                          onChange={(e) => handleInputChange("curso", e.target.value)}
                        >
                          <option value="" disabled>Selecione um instrumento...</option>
                          {instruments.map((inst) => (
                            <option key={inst.value} value={inst.value}>
                              {inst.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">Nível Musical</label>
                        <select
                          id="nivel"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          value={formData.nivel}
                          onChange={(e) => handleInputChange("nivel", e.target.value)}
                        >
                          <option value="iniciante">Iniciante (Nunca toquei)</option>
                          <option value="basico">Básico (Até 6 meses)</option>
                          <option value="intermediario">Intermediário (1 a 3 anos)</option>
                          <option value="avancado">Avançado (+3 anos)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="instrumentoProprio" className="block text-sm font-medium text-gray-700 mb-1">Possui Instrumento Próprio?</label>
                        <select
                          id="instrumentoProprio"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          value={formData.instrumentoProprio}
                          onChange={(e) => handleInputChange("instrumentoProprio", e.target.value)}
                        >
                          <option value="nao">Não</option>
                          <option value="sim">Sim</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700 mb-1">Objetivo da Aula</label>
                        <input
                          id="objetivo"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent"
                          placeholder="Ex: Hobby, Desenvolvimento Cognitivo, Profissionalização"
                          value={formData.objetivo}
                          onChange={(e) => handleInputChange("objetivo", e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidade - Dias</label>
                        <div className="flex flex-wrap gap-2">
                          {days.map((day) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleDay(day)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedDays.includes(day)
                                  ? "bg-ccml-gold text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {day.slice(0, 3)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidade - Turnos</label>
                        <div className="flex flex-wrap gap-2">
                          {shifts.map((shift) => (
                            <button
                              key={shift}
                              type="button"
                              onClick={() => toggleShift(shift)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedShifts.includes(shift)
                                  ? "bg-ccml-gold text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {shift}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Health */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 font-playfair">
                      <Heart className="w-5 h-5 text-ccml-gold" />
                      Saúde e Bem-estar
                    </h3>

                    <div>
                      <label htmlFor="necessidades" className="block text-sm font-medium text-gray-700 mb-2">
                        Para oferecermos a melhor experiência de aprendizado, há algo sobre a saúde ou desenvolvimento que gostaria de compartilhar?
                      </label>
                      <textarea
                        id="necessidades"
                        className="flex min-h-[150px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ccml-gold focus:border-transparent resize-y"
                        placeholder="Este é um espaço seguro. Conte-nos se o aluno tem alguma alergia, sensibilidade ou condição específica (ex: TDAH, TEA) para que possamos acolhê-lo da melhor forma."
                        value={formData.necessidades}
                        onChange={(e) => handleInputChange("necessidades", e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Plan */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 font-playfair">
                      <DollarSign className="w-5 h-5 text-ccml-gold" />
                      Escolha seu Plano
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {plans.map((plan) => (
                        <button
                          key={plan.value}
                          type="button"
                          onClick={() => setSelectedPlan(plan.value)}
                          className={`p-5 rounded-xl border-2 text-left transition-all ${
                            selectedPlan === plan.value
                              ? "border-ccml-gold bg-ccml-gold/5"
                              : "border-gray-200 hover:border-ccml-gold/50"
                          }`}
                        >
                          <div className="font-semibold text-gray-900 mb-1">{plan.title}</div>
                          <div className="text-2xl font-bold text-ccml-gold mb-1">
                            R$ {plan.price}
                            <span className="text-sm font-normal text-gray-500">/mês</span>
                          </div>
                          <div className="text-sm text-gray-500">{plan.description}</div>
                        </button>
                      ))}
                    </div>

                    {selectedPlan && (
                      <div className="p-4 bg-ccml-gold/10 rounded-xl border border-ccml-gold/20">
                        <h4 className="font-semibold text-ccml-gold mb-2">Resumo da Matrícula</h4>
                        <p className="text-sm text-gray-700"><strong>Aluno:</strong> {formData.nome || "Não informado"}</p>
                        <p className="text-sm text-gray-700"><strong>Curso:</strong> {instruments.find(i => i.value === formData.curso)?.label || "Não selecionado"}</p>
                        <p className="text-sm text-gray-700"><strong>Plano:</strong> {plans.find(p => p.value === selectedPlan)?.title}</p>
                        <p className="text-lg font-bold text-ccml-gold mt-2">
                          Total Mensal: R$ {plans.find(p => p.value === selectedPlan)?.price}
                        </p>
                      </div>
                    )}

                    <div className="flex items-start space-x-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <input
                        type="checkbox"
                        id="autorizaImagem"
                        className="h-4 w-4 mt-1 rounded border-gray-300 text-ccml-gold focus:ring-ccml-gold"
                        checked={formData.autorizaImagem}
                        onChange={(e) => handleInputChange("autorizaImagem", e.target.checked)}
                      />
                      <label
                        htmlFor="autorizaImagem"
                        className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                      >
                        Autorizo o uso da minha imagem (ou do menor sob minha responsabilidade) para fins de divulgação nas redes sociais da escola.
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentStep === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                  }`}
                >
                  <ArrowLeft size={16} />
                  Voltar
                </button>

                {currentStep < 5 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2 bg-ccml-gold text-white rounded-md text-sm font-medium hover:bg-[#b08d45] transition-colors"
                  >
                    Avançar
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedPlan}
                    className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      !selectedPlan
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    <Check size={16} />
                    Finalizar Matrícula
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
