import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  Download,
  Filter,
  Globe2,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | WEBNOVA IA" },
      { name: "description", content: "Painel de prospecção e gestão de leads da WEBNOVA IA." },
    ],
  }),
  component: Dashboard,
});

const demoLeads: [string, string, string, string, string][] = [
  ["Odonto Prime", "Clínica odontológica", "São Paulo, SP", "odonto-prime.com", "Alto"],
  ["Sorriso Center", "Clínica odontológica", "Campinas, SP", "sorrisocenter.com", "Alto"],
  ["Clínica Nova Vida", "Clínica médica", "Santos, SP", "novavida.com.br", "Médio"],
  ["Studio Vision", "Estética", "São Paulo, SP", "studiovision.com", "Alto"],
  ["Alpha Contábil", "Contabilidade", "Guarulhos, SP", "alphacontabil.com", "Médio"],
];

const navItems = [
  [LayoutDashboard, "Painel central"],
  [Search, "Encontrar leads"],
  [Building2, "Minhas listas"],
  [BarChart3, "Relatórios"],
  [Settings, "Configurações"],
] as const;

function Dashboard() {
  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState("Painel central");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("São Paulo, SP");
  const [mobileOpen, setMobileOpen] = useState(false);
  const notify = (message: string) => console.log("[WEBNOVA IA]", message);

  const filtered = useMemo(
    () => demoLeads.filter((lead) => lead.join(" ").toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <main className="min-h-screen bg-[#030509] text-white selection:bg-blue-500/30">
      <div className="flex min-h-screen">
        {mobileOpen && (
          <button
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-white/[0.07] bg-[#070a10] p-5 transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 font-bold tracking-tight" onClick={() => setMobileOpen(false)}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                <Target className="h-5 w-5" />
              </span>
              <span className="text-lg">WEBNOVA IA</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-9">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">Workspace</p>
            <nav className="space-y-1.5">
              {navItems.map(([Icon, label]) => (
                <button
                  key={label}
                  onClick={() => { setSidebar(label); setMobileOpen(false); }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition-all ${sidebar === label ? "bg-blue-500/10 text-blue-300 ring-1 ring-inset ring-blue-500/10" : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"}`}
                >
                  <Icon className={`h-[17px] w-[17px] ${sidebar === label ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"}`} />
                  {label}
                  {label === "Encontrar leads" && <span className="ml-auto rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-blue-400">NEW</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/15 bg-gradient-to-br from-blue-500/[0.12] to-transparent p-4">
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-500/10 blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Plano Starter</p>
                  <Zap className="h-4 w-4 text-blue-400" />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">740 de 1.000 leads usados</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
                </div>
                <Link to="/" hash="planos" className="mt-3 block text-xs font-semibold text-blue-400 hover:text-blue-300">Fazer upgrade →</Link>
              </div>
            </div>
            <Link to="/" className="mt-5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-white/[0.03] hover:text-white">
              <LogOut className="h-4 w-4" /> Sair
            </Link>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.06] bg-[#030509]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="rounded-xl border border-white/[0.07] p-2.5 text-slate-400 hover:bg-white/5 lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm font-semibold">{sidebar}</p>
                <p className="hidden text-[11px] text-slate-600 sm:block">Gerencie sua prospecção em um só lugar</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button onClick={() => notify("Notificações")} className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.015] text-slate-500 transition hover:border-white/10 hover:text-white">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
              </button>
              <button onClick={() => notify("Menu do usuário")} className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.015] px-2.5 py-1.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-xs font-bold text-blue-300">RU</span>
                <span className="hidden text-xs font-medium sm:block">Ruan</span>
                <ChevronDown className="h-3 w-3 text-slate-600" />
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-9">
            {sidebar === "Painel central" ? (
            <>
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-blue-400">
                  <Sparkles className="h-3.5 w-3.5" /> Seu workspace está ativo
                </div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Olá, Ruan. Vamos encontrar clientes?</h1>
                <p className="mt-2 max-w-xl text-sm text-slate-500">Encontre empresas, organize seus leads e transforme oportunidades em novos negócios.</p>
              </div>
              <button onClick={() => notify("Nova pesquisa")} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/10 transition hover:-translate-y-0.5 hover:bg-blue-500 md:w-auto">
                <Plus className="h-4 w-4" /> Nova pesquisa
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Stat icon={<Users />} label="Leads encontrados" value="2.481" change="+18,4%" />
              <Stat icon={<Search />} label="Pesquisas este mês" value="184" change="+12,1%" />
              <Stat icon={<Building2 />} label="Empresas salvas" value="327" change="+8,6%" />
              <Stat icon={<TrendingUp />} label="Taxa de oportunidades" value="23,8%" change="+4,2%" />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.5fr]">
              <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070a10]">
                <div className="border-b border-white/[0.06] p-5 sm:p-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="font-semibold">Encontrar novos leads</h2>
                      <p className="mt-1 text-xs text-slate-600">Defina os critérios para descobrir empresas.</p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/[0.06] px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Busca pronta
                    </span>
                  </div>
                </div>
                <div className="grid gap-3 p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-4">
                  <Field label="Nicho" value={query || "Clínicas odontológicas"} onChange={setQuery} icon={<Users />} />
                  <Field label="Localização" value={location} onChange={setLocation} icon={<MapPin />} />
                  <Field label="Website" value="Com website" icon={<Globe2 />} />
                  <button onClick={() => notify("Pesquisar")} className="h-11 self-end rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-600/10 transition hover:bg-blue-500">
                    <Search className="mr-2 inline h-4 w-4" /> Pesquisar
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-[#070a10] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs font-medium text-slate-400">Uso do plano</p><p className="mt-1 text-2xl font-semibold">74%</p></div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400"><Zap className="h-5 w-5" /></div>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full w-[74%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400" /></div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-600"><span>740 usados</span><span>260 restantes</span></div>
                <p className="mt-5 rounded-xl bg-white/[0.025] p-3 text-[11px] leading-5 text-slate-500">Você está usando bem seu plano. Faça upgrade quando precisar de mais pesquisas.</p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070a10]">
              <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2"><h2 className="font-semibold">Resultados recentes</h2><span className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-slate-500">{filtered.length} resultados</span></div>
                  <p className="mt-1 text-xs text-slate-600">Empresas encontradas nas suas últimas pesquisas.</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative min-w-0 flex-1 sm:w-56">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar nos resultados..." className="h-9 w-full rounded-lg border border-white/[0.07] bg-white/[0.02] pl-9 pr-3 text-xs text-slate-300 outline-none placeholder:text-slate-700 focus:border-blue-500/30" />
                  </div>
                  <button className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.07] text-slate-500 transition hover:bg-white/[0.03] hover:text-white"><Filter className="h-3.5 w-3.5" /></button>
                  <button onClick={() => notify("Exportar")} className="hidden items-center gap-2 rounded-lg border border-white/[0.07] px-3 text-xs text-slate-400 transition hover:bg-white/[0.03] hover:text-white sm:inline-flex"><Download className="h-3.5 w-3.5" /> Exportar</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left">
                  <thead className="border-b border-white/[0.05] bg-white/[0.01] text-[9px] uppercase tracking-[0.16em] text-slate-600">
                    <tr><th className="px-5 py-3.5 font-medium">Empresa</th><th className="px-5 py-3.5 font-medium">Segmento</th><th className="px-5 py-3.5 font-medium">Localização</th><th className="px-5 py-3.5 font-medium">Website</th><th className="px-5 py-3.5 font-medium">Potencial</th><th className="px-5 py-3.5" /></tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead) => (
                      <tr key={lead[0]} className="group border-b border-white/[0.05] last:border-0 transition hover:bg-white/[0.025]">
                        <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-400">{lead[0][0]}</span><div><p className="text-sm font-medium">{lead[0]}</p><p className="mt-0.5 text-[10px] text-slate-600">Empresa verificada</p></div></div></td>
                        <td className="px-5 py-4 text-xs text-slate-500">{lead[1]}</td>
                        <td className="px-5 py-4 text-xs text-slate-500">{lead[2]}</td>
                        <td className="px-5 py-4 text-xs text-blue-400">{lead[3]}</td>
                        <td className="px-5 py-4"><span className={`rounded-md px-2 py-1 text-[10px] font-medium ${lead[4] === "Alto" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"}`}>{lead[4]}</span></td>
                        <td className="px-5 py-4 text-right"><button onClick={() => notify("Ver detalhes")} className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-slate-600 opacity-0 transition group-hover:opacity-100 hover:bg-white/5 hover:text-white">Ver detalhes</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && <div className="p-12 text-center text-sm text-slate-600">Nenhum lead encontrado para sua busca.</div>}
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.05] px-5 py-3 text-[10px] text-slate-600">
                <span>Mostrando {filtered.length} de 2.481 leads</span>
                <button onClick={() => notify("Ver todos")} className="text-blue-400 hover:text-blue-300">Ver todos →</button>
              </div>
            </div>
            </>
            ) : (
              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#070a10] p-8 text-center sm:p-10">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-500/10 text-blue-400"><LayoutDashboard className="h-6 w-6" /></div>
                <h2 className="mt-5 text-xl font-semibold">{sidebar}</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">Esta seção está preparada para receber a funcionalidade completa. A integração real deste módulo será conectada aqui.</p>
                <button onClick={() => notify(sidebar)} className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500">Continuar</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ icon, label, value, change }: { icon: ReactNode; label: string; value: string; change: string }) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#070a10] p-5 transition hover:-translate-y-0.5 hover:border-blue-500/20">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <span className="rounded-md bg-emerald-500/[0.06] px-2 py-1 text-[9px] font-medium text-emerald-400">{change}</span>
      </div>
      <p className="mt-5 text-xs text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function Field({ label, value, onChange, icon }: { label: string; value: string; onChange?: (v: string) => void; icon: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600">{label}</span>
      <div className="flex h-11 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 transition focus-within:border-blue-500/30">
        <span className="text-blue-400 [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
        <input value={value} onChange={(e) => onChange?.(e.target.value)} readOnly={!onChange} className="min-w-0 flex-1 bg-transparent text-xs text-slate-300 outline-none" />
      </div>
    </label>
  );
}
