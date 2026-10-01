import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, CheckCircle2, MapPin, Search, Sparkles, Target, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard-inicio")({
  head: () => ({
    meta: [
      { title: "Comece aqui | WEBNOVA IA" },
      { name: "description", content: "Guia rápido para começar a encontrar e organizar leads com a WEBNOVA IA." },
    ],
  }),
  component: DashboardInicio,
});

const steps = [
  {
    number: "01",
    icon: <Search className="h-5 w-5" />,
    title: "Defina o que você procura",
    text: "Escolha o nicho, a cidade ou região e os critérios que sua empresa precisa para encontrar oportunidades relevantes.",
  },
  {
    number: "02",
    icon: <Users className="h-5 w-5" />,
    title: "Encontre novos leads",
    text: "Execute sua pesquisa e explore uma lista organizada de empresas que podem se tornar novos clientes.",
  },
  {
    number: "03",
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Analise e organize",
    text: "Veja os detalhes dos leads, filtre os melhores contatos e organize os resultados para sua operação comercial.",
  },
  {
    number: "04",
    icon: <Bot className="h-5 w-5" />,
    title: "Use a IA para acelerar",
    text: "Converse com o Chat de IA para obter ajuda na análise dos leads, ideias de abordagem e próximos passos.",
  },
];

function DashboardInicio() {
  return (
    <main className="min-h-screen bg-[#030509] text-white selection:bg-blue-500/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <header className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5 font-bold tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Target className="h-5 w-5" />
            </span>
            <span className="text-lg">WEBNOVA IA</span>
          </Link>
          <Link to="/dashboard" className="hidden items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.04] sm:inline-flex">
            Ir para o painel <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </header>

        <section className="relative mt-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070a10] px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-cyan-500/[0.06] blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/15 bg-blue-500/[0.07] px-3 py-1.5 text-[11px] font-semibold text-blue-300">
              <Sparkles className="h-3.5 w-3.5" /> Bem-vindo à WEBNOVA IA
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Sua prospecção começa aqui.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Encontre empresas, descubra oportunidades e organize seus próximos clientes em poucos passos.
              Preparamos este guia rápido para você aproveitar melhor seu dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-500">
                Começar a encontrar leads <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.04]">
                Conhecer o painel
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Como funciona</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Quatro passos para começar</h2>
            <p className="mt-2 text-sm text-slate-500">Do primeiro filtro até a próxima conversa comercial.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article key={step.number} className="rounded-2xl border border-white/[0.07] bg-[#070a10] p-5 transition hover:-translate-y-0.5 hover:border-blue-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">{step.number}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400">{step.icon}</span>
                </div>
                <h3 className="mt-7 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-500">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <Info icon={<Target />} title="Prospecção centralizada" text="Tenha pesquisa, resultados e organização dos leads em um só lugar." />
          <Info icon={<MapPin />} title="Filtros por região" text="Comece por uma cidade, estado ou região para tornar suas buscas mais específicas." />
          <Info icon={<Bot />} title="IA como copiloto" text="Use o Chat de IA para transformar dados dos leads em ações comerciais." />
        </section>

        <footer className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>WEBNOVA IA · Prospecção inteligente</span>
          <Link to="/dashboard" className="font-semibold text-blue-400 hover:text-blue-300">Ir para o dashboard →</Link>
        </footer>
      </div>
    </main>
  );
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#070a10] p-5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.04] text-blue-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</div>
      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}
