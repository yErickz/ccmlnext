import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  // Estilos base compartilhados
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer";
  
  // Variantes de estilo
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#c7a557] text-[#151922] hover:bg-[#b08d45] shadow-lg shadow-[#c7a557]/20 hover:scale-105",
    secondary: "bg-[#1d2330] text-white hover:bg-[#2a3245] shadow-lg",
    outline: "border-2 border-[#1d2330] text-ccml-dark hover:bg-[#1d2330] hover:text-white",
    ghost: "bg-transparent text-ccml-dark hover:bg-gray-100",
  };

  // Tamanhos
  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const widthClass = fullWidth ? "w-full" : "";
  
  const combinedClassName = [
    baseStyles,
    variants[variant],
    sizes[size],
    widthClass,
    className
  ].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}