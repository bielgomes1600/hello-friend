import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, BarChart3, Check, ChevronDown, Database, Globe2, ShieldCheck,
  Sparkles, Target, Users, Zap,
} from "lucide-react";
import { useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({ component: SalesPage });
function SalesPage() {
  const [openFaq,setOpenFaq]=useState<number|null>(null);
  return <main className="min-h-screen overflow-hidden bg-[#05070b] text-white">\n    <style>{`@keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.015)}}`}</style>
    <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,.22),transparent_38%),radial-gradient(circle_at_100%_35%,rgba(14,165,233,.10),transparent_28%)]"/>
    <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
      <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25"><Target className="h-5 w-5"/></span><span className="text-lg">WEBNOVA IA</span></a>
      <div className="hidden items-center gap-7 text-sm text-slate-400 md:flex"><a href="#beneficios" className="hover:text-white">Benefícios</a><a href="#como-funciona" className="hover:text-white">Como funciona</a><a href="#planos" className="hover:text-white">Planos</a><a href="#faq" className="hover:text-white">FAQ</a></div>
      <a href="/login" className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold hover:bg-white/[0.09]">Entrar</a>
    </nav>

    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pt-28"><div className="pointer-events-none absolute inset-0 -z-10 opacity-45"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,.12),transparent_35%)]"/><div className="absolute inset-x-0 top-0 h-[520px]"><div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,rgba(59,130,246,.10)_0,rgba(59,130,246,.10)_1px,transparent_1px,transparent_46px)] [mask-image:linear-gradient(to_bottom,black,transparent)]"/></div></div>
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300"><Sparkles className="h-3.5 w-3.5"/>SaaS de prospecção B2B</div>
        <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Pare de perder horas procurando clientes.<span className="mt-3 block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Encontre seus próximos leads.</span></h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Tenha uma plataforma para descobrir empresas, filtrar oportunidades e criar listas de prospecção sem depender de pesquisas manuais.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><a href="#planos" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold shadow-2xl shadow-blue-600/25 transition hover:bg-blue-500">Começar agora<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></a><a href="#como-funciona" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-slate-200 hover:bg-white/[0.07]">Ver como funciona</a></div>
        <div className="mt-5 flex items-center justify-center gap-5 text-xs text-slate-600"><span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400"/>Sem fidelidade</span><span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400"/>Cancele quando quiser</span></div>
      </div>

      <div id="como-funciona" className="mx-auto mt-20 max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-[#0b0f16]/90 p-6 shadow-2xl shadow-blue-950/30 sm:p-10">
          <div className="text-center"><p className="text-sm font-bold tracking-wider text-blue-400">COMO FUNCIONA</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Encontre empresas em poucos passos.</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">A WEBNOVA IA transforma a pesquisa manual em um processo simples para você descobrir, analisar e organizar novos leads.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <HowStep number="01" icon={<Target/>} title="Defina seu público" text="Informe o nicho, a localização e os critérios do tipo de empresa que você deseja encontrar."/>
            <HowStep number="02" icon={<Zap/>} title="A WEBNOVA IA pesquisa" text="A plataforma processa sua busca e organiza as empresas encontradas de forma clara e prática."/>
            <HowStep number="03" icon={<Users/>} title="Organize e prospecte" text="Analise as oportunidades, salve seus leads e use os dados no seu processo comercial."/>
          </div>
          <div className="mt-8 grid gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/[0.04] p-5 sm:grid-cols-3">
            <MiniInfo icon={<Database/>} title="Dados organizados" text="Resultados centralizados em um só lugar."/>
            <MiniInfo icon={<BarChart3/>} title="Mais controle" text="Acompanhe sua operação de prospecção."/>
            <MiniInfo icon={<Globe2/>} title="100% online" text="Acesse pelo navegador de qualquer lugar."/>
          </div>
        </div>
      </div>
    </section>

    <section id="beneficios" className="relative z-10 border-y border-white/5 bg-white/[0.015]"><div className="mx-auto grid max-w-7xl gap-px px-6 py-20 lg:grid-cols-3 lg:px-8"><Feature icon={<SearchIcon/>} title="Encontre oportunidades" text="Pesquise empresas por nicho, cidade e critérios que fazem sentido para sua estratégia comercial."/><Feature icon={<Database/>} title="Organize seus leads" text="Tenha seus resultados em um só lugar, prontos para serem usados no seu processo de vendas."/><Feature icon={<Zap/>} title="Economize tempo" text="Troque horas de pesquisa manual por uma ferramenta criada para acelerar sua prospecção."/></div></section>

    

    <section id="planos" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8"><div className="text-center"><p className="text-sm font-bold tracking-wider text-blue-400">ASSINATURA</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Escolha seu plano e comece a prospectar.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">Planos mensais para diferentes volumes de prospecção.</p></div><div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">{plans.map(plan=><div key={plan.name} className={`relative rounded-2xl border p-7 ${plan.popular?"border-blue-500/60 bg-blue-500/[0.06] shadow-2xl shadow-blue-950/20":"border-white/8 bg-white/[0.02]"}`}>{plan.popular&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Mais escolhido</div>}<h3 className="text-lg font-semibold">{plan.name}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">{plan.description}</p><div className="mt-6"><span className="text-4xl font-semibold">R$ {plan.price}</span><span className="text-sm text-slate-500"> / mês</span></div><p className="mt-2 text-xs font-medium text-blue-400">{plan.leads}</p><a href="#checkout" className={`mt-7 block w-full rounded-xl px-4 py-3 text-center text-sm font-bold transition ${plan.popular?"bg-blue-600 hover:bg-blue-500":"border border-white/10 bg-white/[0.05] hover:bg-white/[0.09]"}`}>Assinar {plan.name}</a><div className="mt-7 space-y-3 border-t border-white/8 pt-6">{plan.features.map(f=><div key={f} className="flex items-center gap-2.5 text-sm text-slate-300"><Check className="h-4 w-4 shrink-0 text-blue-400"/>{f}</div>)}</div></div>)}</div></section>

    <section id="checkout" className="relative z-10 px-6 pb-24 lg:px-8"><div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-transparent p-8 text-center sm:p-12"><ShieldCheck className="mx-auto h-8 w-8 text-blue-400"/><h2 className="mt-5 text-3xl font-semibold tracking-tight">Pronto para começar sua prospecção?</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">Escolha um plano, crie sua conta e tenha acesso à plataforma de leads.</p><a href="#planos" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold hover:bg-blue-500">Escolher meu plano <ArrowRight className="h-4 w-4"/></a></div></section>

    <section id="faq" className="relative z-10 mx-auto max-w-3xl px-6 pb-24 lg:px-8"><div className="text-center"><p className="text-sm font-bold tracking-wider text-blue-400">FAQ</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Perguntas frequentes</h2></div><div className="mt-10 divide-y divide-white/8 rounded-2xl border border-white/8 bg-white/[0.02]">{faqs.map(([q,a],i)=><button key={q} onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full px-6 py-5 text-left"><div className="flex items-center justify-between gap-5"><span className="text-sm font-medium">{q}</span><ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition ${openFaq===i?"rotate-180":""}`}/></div>{openFaq===i&&<p className="mt-3 pr-8 text-sm leading-6 text-slate-500">{a}</p>}</button>)}</div></section>

    <footer className="relative z-10 border-t border-white/5 px-6 py-8 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-slate-600 sm:flex-row"><div className="font-semibold text-slate-400">WEBNOVA IA</div><p>Prospecção inteligente para sua operação comercial.</p><div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5"/> Segurança e privacidade</div></div></footer>
  </main>;
}

function SearchIcon(){ return <span className="[&>svg]:h-5 [&>svg]:w-5"><Target/></span>; }
function HowStep({number,icon,title,text}:{number:string;icon:ReactNode;title:string;text:string}){return <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 text-left"><div className="flex items-center justify-between"><span className="text-sm font-bold text-blue-400">{number}</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span></div><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text}</p></div>}
function MiniInfo({icon,title,text}:{icon:ReactNode;title:string;text:string}){return <div className="flex items-start gap-3"><span className="mt-0.5 text-blue-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div><p className="text-xs font-semibold text-slate-300">{title}</p><p className="mt-1 text-[11px] leading-5 text-slate-600">{text}</p></div></div>}
function Feature({icon,title,text}:{icon:ReactNode;title:string;text:string}){return <div className="bg-[#05070b] p-8 lg:p-10"><div className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-400 [&>svg]:h-5 [&>svg]:w-5">{icon}</div><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{text}</p></div>}
