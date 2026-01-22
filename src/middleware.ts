// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verifica se existe um cookie de sessão do Firebase (ou lógica customizada)
  // Nota: Middleware do Next.js roda no Edge, então a verificação completa do Firebase Auth
  // geralmente é feita no cliente ou via cookies de sessão.
  // Aqui faremos uma verificação básica ou redirecionamento client-side.
  
  // Para uma proteção robusta server-side com Firebase, recomenda-se usar cookies de sessão.
  // Por enquanto, vamos permitir que o client-side (useEffect no dashboard) faça a verificação final,
  // mas podemos checar a presença de um cookie se você implementar session cookies.
  
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
