// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Firebase Imports
import { auth } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";

// Utilitário para classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Schema de Validação Zod
const loginSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  remember: z.boolean(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // Login com Email/Senha
  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setAuthError("");

    try {
      // Configurar persistência
      await setPersistence(auth, data.remember ? browserLocalPersistence : browserSessionPersistence);
      
      // Login
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erro no login:", error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setAuthError("E-mail ou senha incorretos.");
      } else if (error.code === 'auth/too-many-requests') {
        setAuthError("Muitas tentativas. Tente novamente mais tarde.");
      } else {
        setAuthError("Ocorreu um erro ao tentar entrar. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Login com Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setAuthError("");
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erro Google:", error);
      setAuthError("Erro ao conectar com Google.");
      setIsLoading(false);
    }
  };

  // Recuperar Senha
  const handleForgotPassword = async () => {
    const email = getValues("email");
    if (!email || errors.email) {
      setAuthError("Digite um e-mail válido para recuperar a senha.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setAuthError(""); // Limpa erros anteriores
      setTimeout(() => setResetSent(false), 5000); // Esconde msg após 5s
    } catch (error: any) {
      setAuthError("Erro ao enviar e-mail de recuperação.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay" />
      
      {/* Card Centralizado */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative z-10 border border-white/50 animate-in fade-in zoom-in duration-500">
        
        {/* Link Voltar */}
        <Link 
          href="/" 
          className="absolute top-6 left-6 text-slate-500 hover:text-amber-600 transition-colors flex items-center gap-1 text-sm font-medium group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>

        {/* Cabeçalho */}
        <div className="text-center mb-8 mt-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 font-playfair tracking-tight">
            Centro Cultural <br/>
            <span className="text-amber-500">Maestro Levi</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Acesse sua área exclusiva de aluno.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Campo E-mail */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 ml-1">
              E-mail
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                <Mail size={20} />
              </div>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-800 placeholder:text-slate-400 shadow-sm",
                  errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                )}
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium ml-1 animate-pulse flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Senha */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 ml-1">
              Senha
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                <Lock size={20} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={cn(
                  "w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-800 placeholder:text-slate-400 shadow-sm",
                  errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                )}
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus-visible:text-amber-500"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-medium ml-1 animate-pulse flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password.message}
              </p>
            )}
          </div>

          {/* Lembrar-me e Esqueceu Senha */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group select-none">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  {...register("remember")}
                />
                <div className="w-5 h-5 border-2 border-slate-300 rounded bg-white peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all shadow-sm group-hover:border-amber-400"></div>
                <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity pointer-events-none" />
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors font-medium">Lembrar-me</span>
            </label>
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded px-1"
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Mensagens de Feedback */}
          {authError && (
            <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium animate-pulse">
              {authError}
            </div>
          )}
          
          {resetSent && (
            <div role="status" className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm text-center font-medium">
              E-mail de recuperação enviado! Verifique sua caixa de entrada.
            </div>
          )}

          {/* Botão Entrar */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-amber-500/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Entrando...</span>
              </>
            ) : (
              "Entrar"
            )}
          </button>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/80 backdrop-blur px-2 text-slate-400 font-semibold tracking-wider">Ou entre com</span>
            </div>
          </div>

          {/* Botão Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
        </form>

        {/* Rodapé */}
        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-500">
            Não tem uma conta?{" "}
            <Link href="/matricula" className="text-amber-600 font-bold hover:text-amber-700 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded px-1">
              Matricule-se agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
