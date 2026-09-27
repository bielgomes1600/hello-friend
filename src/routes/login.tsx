import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Target } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden border-r border-white/5 bg-[#080b11] lg:flex lg:flex-col lg:justify-between p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,.20),transparent_42%)]" />
          <Link to="/" className="relative flex items-center gap-2 font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600"><Target className="h-5 w-5" /></span>Lead<span className="text-blue-400">Flow</span></Link>
          <div className="relative max-w-lg"><p className="text-sm font-semibold text-blue-400">ÁREA DO USUÁRIO</p><h1 className="mt-4 text-5xl font-semibold tracking-tight">Encontre seus próximos clientes.</h1><p className="mt-5 leading-7 text-slate-400">Acesse sua plataforma de prospecção e transforme pesquisas em oportunidades comerciais.</p></div>
          <p className="relative text-xs text-slate-600">© 2026 LeadFlow</p>
        </section>
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"><ArrowLeft className="h-4 w-4" /> Voltar para o site</Link>
            <div className="mb-8 lg:hidden flex items-center gap-2 font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600"><Target className="h-5 w-5" /></span>Lead<span className="text-blue-400">Flow</span></div>
            <h2 className="text-3xl font-semibold tracking-tight">Entrar na sua conta</h2>
            <p className="mt-2 text-sm text-slate-500">Acesse seu painel de leads.</p>
            <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div><label className="text-sm font-medium text-slate-300">E-mail</label><input type="email" placeholder="voce@empresa.com" className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm outline-none placeholder:text-slate-700 focus:border-blue-500/60" /></div>
              <div><div className="flex justify-between"><label className="text-sm font-medium text-slate-300">Senha</label><button type="button" className="text-xs text-blue-400">Esqueci minha senha</button></div><div className="relative mt-2"><input type={showPassword ? "text" : "password"} placeholder="••••••••" className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm outline-none placeholder:text-slate-700 focus:border-blue-500/60" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></div>
              <Link to="/dashboard" className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold hover:bg-blue-500">Entrar</Link>
            </form>
            <p className="mt-7 text-center text-sm text-slate-500">Ainda não tem uma conta? <Link to="/#planos" className="font-semibold text-blue-400 hover:text-blue-300">Começar grátis</Link></p>
            <p className="mt-10 text-center text-[11px] leading-5 text-slate-700">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
