import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Bell, Building2, ChevronDown, Download, Filter, Globe2, LayoutDashboard, LogOut, MapPin, Plus, Search, Settings, Target, Users, Zap } from "lucide-react";
import { useState, type ReactNode } from "react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const demoLeads = [
  ["Odonto Prime", "Clínica odontológica", "São Paulo, SP", "odonto-prime.com", "Alto"],
  ["Sorriso Center", "Clínica odontológica", "Campinas, SP", "sorrisocenter.com", "Alto"],
  ["Clínica Nova Vida", "Clínica médica", "Santos, SP", "novavida.com.br", "Médio"],
  ["Studio Vision", "Estética", "São Paulo, SP", "studiovision.com", "Alto"],
  ["Alpha Contábil", "Contabilidade", "Guarulhos, SP", "alphacontabil.com", "Médio"],
];

function Dashboard() {
  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState("Visão geral");
  const [query, setQuery] = useState("");
  const filtered = demoLeads.filter((lead) => lead.join(" ").toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-[#080b11] p-5 lg:flex lg:flex-col">
          <Link to="/" className="flex items-center gap-2 font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600"><Target className="h-5 w-5" /></span>Lead<span className="text-blue-400">Flow</span></Link>
          <nav className="mt-10 space-y-1">
            {[[LayoutDashboard,"Visão geral"],[Search,"Encontrar leads"],[Building2,"Minhas listas"],[BarChart3,"Relatórios"],[Settings,"Configurações"]].map(([Icon,label]) => <button key={label as string} onClick={() => setSidebar(label as string)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${sidebar === label ? "bg-blue-500/10 text-blue-300" : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"}`}><Icon className="h-4 w-4" />{label as string}</button>)}
          </nav>
          <div className="mt-auto rounded-2xl border border-blue-500/10 bg-blue-500/[0.04] p-4"><p className="text-xs font-semibold">Plano Starter</p><p className="mt-1 text-[11px] text-slate-600">740 / 1.000 leads</p><div className="mt-3 h-1.5 rounded-full bg-white/5"><div className="h-full w-[74%] rounded-full bg-blue-500" /></div><Link to="/#planos" className="mt-3 block text-xs font-semibold text-blue-400">Fazer upgrade →</Link></div>
          <Link to="/" className="mt-5 flex items-center gap-3 px-3 text-sm text-slate-600 hover:text-white"><LogOut className="h-4 w-4" />Sair</Link>
        </aside>
        <section className="min-w-0 flex-1">
          <header className="flex h-16 items-center justify-between border-b border-white/5 px-5 lg:px-8">
            <div><p className="text-sm font-semibold">{sidebar}</p><p className="hidden text-[11px] text-slate-600 sm:block">Gerencie sua prospecção</p></div>
            <div className="flex items-center gap-3"><button className="grid h-9 w-9 place-items-center rounded-lg border border-white/5 text-slate-500"><Bell className="h-4 w-4" /></button><div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-400">RU</span><span className="hidden text-xs font-medium sm:block">Ruan</span><ChevronDown className="h-3 w-3 text-slate-600" /></div></div>
          </header>
          <div className="mx-auto max-w-7xl p-5 lg:p-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat icon={<Users />} label="Leads encontrados" value="2.481" change="+18,4%" /><Stat icon={<Search />} label="Pesquisas este mês" value="184" change="+12,1%" /><Stat icon={<Building2 />} label="Empresas salvas" value="327" change="+8,6%" /><Stat icon={<Zap />} label="Uso do plano" value="74%" change="260 restantes" /></div>
            <div className="mt-8 rounded-2xl border border-white/8 bg-[#080b11] p-5 lg:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-lg font-semibold">Encontrar novos leads</h2><p className="mt-1 text-xs text-slate-600">Defina os critérios e encontre empresas.</p></div><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold hover:bg-blue-500"><Plus className="h-4 w-4" />Nova pesquisa</button></div>
              <div className="mt-6 grid gap-3 md:grid-cols-4"><Field label="Nicho" value={query || "Clínicas odontológicas"} onChange={setQuery} icon={<Users />} /><Field label="Localização" value="São Paulo, SP" icon={<MapPin />} /><Field label="Site" value="Com website" icon={<Globe2 />} /><button className="h-11 self-end rounded-xl bg-blue-600 text-sm font-semibold hover:bg-blue-500"><Search className="mr-2 inline h-4 w-4" />Pesquisar</button></div>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/8 bg-[#080b11]">
              <div className="flex flex-col justify-between gap-3 border-b border-white/5 p-5 sm:flex-row sm:items-center"><div><h2 className="font-semibold">Resultados recentes</h2><p className="mt-1 text-xs text-slate-600">{filtered.length} empresas encontradas</p></div><div className="flex gap-2"><button className="rounded-lg border border-white/8 p-2 text-slate-500"><Filter className="h-4 w-4" /></button><button className="inline-flex items-center gap-2 rounded-lg border border-white/8 px-3 py-2 text-xs text-slate-400"><Download className="h-3.5 w-3.5" />Exportar</button></div></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-600"><tr><th className="px-5 py-3 font-medium">Empresa</th><th className="px-5 py-3 font-medium">Segmento</th><th className="px-5 py-3 font-medium">Localização</th><th className="px-5 py-3 font-medium">Website</th><th className="px-5 py-3 font-medium">Potencial</th></tr></thead><tbody>{filtered.map((lead) => <tr key={lead[0]} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-400">{lead[0][0]}</span><span className="text-sm font-medium">{lead[0]}</span></div></td><td className="px-5 py-4 text-xs text-slate-500">{lead[1]}</td><td className="px-5 py-4 text-xs text-slate-500">{lead[2]}</td><td className="px-5 py-4 text-xs text-blue-400">{lead[3]}</td><td className="px-5 py-4"><span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-400">{lead[4]}</span></td></tr>)}</tbody></table></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ icon, label, value, change }: { icon: ReactNode; label: string; value: string; change: string }) {
 return <div className="rounded-2xl border border-white/8 bg-[#080b11] p-5"><div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/10 text-blue-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><span className="text-[10px] text-emerald-400">{change}</span></div><p className="mt-5 text-xs text-slate-600">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div>;
}
function Field({ label, value, onChange, icon }: { label: string; value: string; onChange?: (v:string)=>void; icon: React.ReactNode }) {
 return <label className="block"><span className="mb-1.5 block text-[10px] uppercase tracking-wider text-slate-600">{label}</span><div className="flex h-11 items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3"><span className="text-blue-400 [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span><input value={value} onChange={(e)=>onChange?.(e.target.value)} className="min-w-0 flex-1 bg-transparent text-xs text-slate-300 outline-none" /></div></label>;
}
