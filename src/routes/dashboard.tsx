import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Building2,
  Check,
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
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | WEBNOVA IA" },
      { name: "description", content: "Painel de prospecção e gestão de leads da WEBNOVA IA." },
    ],
  }),
  component: Dashboard,
});

type Lead = {
  id: string;
  company: string;
  segment: string;
  location: string;
  website: string;
  potential: "Alto" | "Médio";
};

type DashboardNotification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

const dashboardLeads: Lead[] = [
  { id: "odonto-prime", company: "Odonto Prime", segment: "Clínica odontológica", location: "São Paulo, SP", website: "odonto-prime.com", potential: "Alto" },
  { id: "sorriso-center", company: "Sorriso Center", segment: "Clínica odontológica", location: "Campinas, SP", website: "sorrisocenter.com", potential: "Alto" },
  { id: "nova-vida", company: "Clínica Nova Vida", segment: "Clínica médica", location: "Santos, SP", website: "novavida.com.br", potential: "Médio" },
  { id: "studio-vision", company: "Studio Vision", segment: "Estética", location: "São Paulo, SP", website: "studiovision.com", potential: "Alto" },
  { id: "alpha-contabil", company: "Alpha Contábil", segment: "Contabilidade", location: "Guarulhos, SP", website: "alphacontabil.com", potential: "Médio" },
];

const navItems = [
  { id: "painel", label: "Painel central", icon: LayoutDashboard },
  { id: "leads", label: "Encontrar leads", icon: Search },
  { id: "listas", label: "Minhas listas", icon: Building2 },
  { id: "relatorios", label: "Relatórios", icon: BarChart3 },
  { id: "configuracoes", label: "Configurações", icon: Settings },
] as const;

const initialNotifications: DashboardNotification[] = [
  {
    id: "lead-ready",
    title: "Nova pesquisa pronta",
    message: "Sua última pesquisa terminou e encontrou novos leads.",
    read: false,
  },
  {
    id: "plan-usage",
    title: "Uso do plano",
    message: "Você utilizou 74% dos leads disponíveis no plano Starter.",
    read: false,
  },
  {
    id: "welcome",
    title: "Workspace ativo",
    message: "Seu workspace está pronto para novas prospecções.",
    read: true,
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("painel");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("São Paulo, SP");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterHighPotential, setFilterHighPotential] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notice, setNotice] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const lastModalTriggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = navItems.find((item) => item.id === activeSection) ?? navItems[0];
  const unreadCount = notifications.filter((item) => !item.read).length;

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!notice) return;
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setNotice(""), 5000);
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, [notice]);

  useEffect(() => {
    const handleOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) setUserMenuOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(target)) setNotificationsOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    return () => document.removeEventListener("pointerdown", handleOutsidePointer);
  }, []);

  useEffect(() => {
    if (!selectedLead && !logoutConfirmOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedLead, logoutConfirmOpen]);

  useEffect(() => {
    if (!selectedLead) return;

    const dialog = modalRef.current;
    if (!dialog) return;

    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const firstFocusable = dialog.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    const handleDialogKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLeadDetails();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusables.length) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);
    return () => document.removeEventListener("keydown", handleDialogKeyDown);
  }, [selectedLead]);

  useEffect(() => {
    if (!logoutConfirmOpen) return;

    const dialog = modalRef.current;
    if (!dialog) return;

    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const firstFocusable = dialog.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    const handleDialogKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setLogoutConfirmOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusables.length) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);
    return () => document.removeEventListener("keydown", handleDialogKeyDown);
  }, [logoutConfirmOpen]);

  const filtered = useMemo(() => {
    const normalizedSearch = debouncedSearch.toLocaleLowerCase("pt-BR");
    return dashboardLeads.filter((lead) => {
      const matchesSearch =
        !normalizedSearch ||
        [lead.company, lead.segment, lead.location, lead.website, lead.potential]
          .join(" ")
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch);
      const matchesPotential = !filterHighPotential || lead.potential === "Alto";
      return matchesSearch && matchesPotential;
    });
  }, [debouncedSearch, filterHighPotential]);

  const notify = (message: string) => setNotice(message);

  const selectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileOpen(false);
    setUserMenuOpen(false);
    setNotificationsOpen(false);
  };

  const openLeadDetails = (lead: Lead, trigger: HTMLElement) => {
    lastModalTriggerRef.current = trigger;
    setSelectedLead(lead);
  };

  const closeLeadDetails = () => {
    setSelectedLead(null);
    window.setTimeout(() => lastModalTriggerRef.current?.focus(), 0);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
    notify("Todas as notificações foram marcadas como lidas.");
  };

  const handleUserMenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const enabledItems = userMenuItemsRef.current.filter(Boolean) as HTMLButtonElement[];
    if (!enabledItems.length) return;

    const currentIndex = enabledItems.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      enabledItems[(currentIndex + 1 + enabledItems.length) % enabledItems.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      enabledItems[(currentIndex - 1 + enabledItems.length) % enabledItems.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      enabledItems[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      enabledItems.at(-1)?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setUserMenuOpen(false);
      document.getElementById("dashboard-user-menu-trigger")?.focus();
    }
  };

  const handleLogout = () => {
    const keys = ["auth", "token", "session", "user", "webnova-session", "webnova-auth"];
    keys.forEach((key) => {
      window.localStorage.removeItem(key);
      window.sessionStorage.removeItem(key);
    });
    setLogoutConfirmOpen(false);
    setUserMenuOpen(false);
    navigate({ to: "/login" });
  };

  const sanitizeCsvCell = (value: unknown) => {
    const stringValue = String(value ?? "");
    const escaped = stringValue.replace(/"/g, '""');
    return /^[=+\-@]/.test(escaped) ? `'${escaped}` : escaped;
  };

  const exportLeads = () => {
    if (!filtered.length) {
      notify("Não há leads para exportar.");
      return;
    }

    try {
      const header = ["Empresa", "Segmento", "Localização", "Website", "Potencial"];
      const rows = filtered.map((lead) => [
        lead.company,
        lead.segment,
        lead.location,
        lead.website,
        lead.potential,
      ]);
      const csv = [header, ...rows]
        .map((row) => row.map(sanitizeCsvCell).map((value) => `"${value}"`).join(","))
        .join("\r\n");

      const blob = new Blob(["\\uFEFF", csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const date = new Intl.DateTimeFormat("pt-BR").format(new Date()).replace(/\//g, "-");
      anchor.href = url;
      anchor.download = `webnova-leads-${date}.csv`;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify(`Exportados ${filtered.length} leads com sucesso.`);
    } catch (error) {
      console.error("Falha ao exportar leads:", error);
      notify("Não foi possível exportar os leads. Tente novamente.");
    }
  };

  const renderSection = () => {
    if (activeSection === "painel") {
      return (
        <DashboardOverview
          query={query}
          location={location}
          setQuery={setQuery}
          setLocation={setLocation}
          onSearch={() => {
            setActiveSection("leads");
            notify(`Pesquisa atualizada para ${query || "Clínicas odontológicas"} em ${location}.`);
          }}
          onNewSearch={() => {
            setActiveSection("leads");
            notify("Formulário de pesquisa pronto. Defina os critérios abaixo.");
          }}
        />
      );
    }

    if (activeSection === "leads") {
      return (
        <LeadsSection
          search={search}
          setSearch={setSearch}
          filtered={filtered}
          filterHighPotential={filterHighPotential}
          setFilterHighPotential={setFilterHighPotential}
          exportLeads={exportLeads}
          onOpenDetails={openLeadDetails}
          onClear={() => {
            setSearch("");
            setFilterHighPotential(false);
            notify("Filtros limpos. Todos os leads estão visíveis.");
          }}
        />
      );
    }

    if (activeSection === "listas") {
      return <ListsSection onNotify={notify} />;
    }

    if (activeSection === "relatorios") {
      return <ReportsSection />;
    }

    return <SettingsSection onLogout={() => setLogoutConfirmOpen(true)} />;
  };

  return (
    <main className="dashboard min-h-screen bg-[#030509] text-white selection:bg-blue-500/30">
      <div className="flex min-h-screen">
        {mobileOpen && (
          <button
            type="button"
            aria-label="Fechar menu lateral"
            onClick={() => setMobileOpen(false)}
            className="dashboard-backdrop fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-white/[0.07] bg-[#070a10] p-5 transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          aria-label="Navegação principal"
        >
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="dashboard-focus flex items-center gap-2.5 rounded-lg font-bold tracking-tight"
              onClick={() => setMobileOpen(false)}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                <Target className="h-5 w-5" />
              </span>
              <span className="text-lg">WEBNOVA IA</span>
            </Link>
            <button
              type="button"
              aria-label="Fechar menu lateral"
              onClick={() => setMobileOpen(false)}
              className="dashboard-focus rounded-lg p-2 text-slate-500 hover:bg-white/5 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-9" aria-label="Workspace">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Workspace
            </p>
            <div className="space-y-1.5">
              {navItems.map(({ id, label, icon: Icon }) => {
                const active = activeSection === id;
                return (
                  <Link
                    key={id}
                    to="/dashboard"
                    hash={id}
                    aria-current={active ? "page" : undefined}
                    onClick={() => selectSection(id)}
                    className={`dashboard-focus group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition-all ${active ? "bg-blue-500/10 text-blue-300 ring-1 ring-inset ring-blue-500/10" : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"}`}
                  >
                    <Icon
                      className={`h-[17px] w-[17px] ${active ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"}`}
                    />
                    {label}
                    {label === "Encontrar leads" && (
                      <span className="ml-auto rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-blue-400">
                        NEW
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

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
                <Link
                  to="/"
                  hash="planos"
                  className="dashboard-focus mt-3 block rounded text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  Fazer upgrade →
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLogoutConfirmOpen(true)}
              className="dashboard-focus mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-white/[0.03] hover:text-white"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.06] bg-[#030509]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Abrir menu lateral"
                onClick={() => setMobileOpen(true)}
                className="dashboard-focus rounded-xl border border-white/[0.07] p-2.5 text-slate-400 hover:bg-white/5 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm font-semibold">{activeItem.label}</p>
                <p className="hidden text-[11px] text-slate-600 sm:block">
                  Gerencie sua prospecção em um só lugar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div ref={notificationRef} className="relative">
                <button
                  ref={notificationButtonRef}
                  type="button"
                  aria-label={`Notificações${unreadCount ? `, ${unreadCount} não lidas` : ""}`}
                  aria-expanded={notificationsOpen}
                  aria-haspopup="dialog"
                  onClick={() => {
                    setNotificationsOpen((current) => !current);
                    setUserMenuOpen(false);
                  }}
                  className="dashboard-focus relative grid h-10 w-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.015] text-slate-500 transition hover:border-white/10 hover:text-white"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span
                      aria-label={`${unreadCount} notificações não lidas`}
                      className="absolute right-1.5 top-1.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-blue-500 px-1 text-[8px] font-bold text-white"
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <section
                    className="dashboard-popover absolute right-0 top-12 z-[70] w-[min(92vw,360px)] rounded-2xl border border-white/10 bg-[#070a10] p-3 shadow-2xl"
                    aria-label="Painel de notificações"
                    role="dialog"
                    aria-modal="false"
                  >
                    <div className="flex items-center justify-between gap-3 px-2 py-2">
                      <div>
                        <h2 className="text-sm font-semibold">Notificações</h2>
                        <p className="mt-0.5 text-[10px] text-slate-600">
                          {unreadCount ? `${unreadCount} não lidas` : "Tudo em dia"}
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllNotificationsRead}
                          className="dashboard-focus rounded-md px-2 py-1 text-[10px] font-medium text-blue-400 hover:bg-white/5"
                        >
                          Marcar todas como lidas
                        </button>
                      )}
                    </div>

                    <div className="mt-2 max-h-80 space-y-1 overflow-y-auto" role="list">
                      {notifications.length === 0 ? (
                        <p className="p-6 text-center text-xs text-slate-600">Nenhuma notificação.</p>
                      ) : (
                        notifications.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            role="listitem"
                            aria-pressed={item.read}
                            onClick={() => markNotificationRead(item.id)}
                            className="dashboard-focus flex w-full items-start gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.035]"
                          >
                            <span
                              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.read ? "bg-slate-700" : "bg-blue-400"}`}
                              aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-slate-200">{item.title}</span>
                                {item.read && <Check className="h-3.5 w-3.5 text-emerald-400" aria-label="Lida" />}
                              </span>
                              <span className="mt-1 block text-[11px] leading-5 text-slate-500">{item.message}</span>
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </section>
                )}
              </div>

              <div ref={userMenuRef} className="relative">
                <button
                  id="dashboard-user-menu-trigger"
                  type="button"
                  aria-label="Abrir menu da conta de Ruan"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  onClick={() => {
                    setUserMenuOpen((current) => !current);
                    setNotificationsOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if ((event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
                      if (!userMenuOpen) {
                        event.preventDefault();
                        setUserMenuOpen(true);
                        window.setTimeout(() => userMenuItemsRef.current[0]?.focus(), 0);
                      }
                    }
                  }}
                  className="dashboard-focus flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.015] px-2.5 py-1.5"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-xs font-bold text-blue-300">
                    RU
                  </span>
                  <span className="hidden text-xs font-medium sm:block">Ruan</span>
                  <ChevronDown className={`h-3 w-3 text-slate-600 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div
                    className="dashboard-popover absolute right-0 top-12 z-[70] w-56 rounded-2xl border border-white/10 bg-[#070a10] p-2 shadow-2xl"
                    role="menu"
                    aria-label="Menu da conta"
                    onKeyDown={handleUserMenuKeyDown}
                  >
                    <div className="border-b border-white/[0.06] px-3 py-2">
                      <p className="text-xs font-semibold text-slate-200">Ruan</p>
                      <p className="mt-0.5 text-[10px] text-slate-600">Workspace WEBNOVA IA</p>
                    </div>
                    <button
                      ref={(element) => {
                        userMenuItemsRef.current[0] = element;
                      }}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setUserMenuOpen(false);
                        selectSection("configuracoes");
                      }}
                      className="dashboard-focus mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-slate-400 hover:bg-white/[0.035] hover:text-white"
                    >
                      <User className="h-4 w-4" /> Perfil
                    </button>
                    <button
                      ref={(element) => {
                        userMenuItemsRef.current[1] = element;
                      }}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setUserMenuOpen(false);
                        selectSection("configuracoes");
                      }}
                      className="dashboard-focus flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-slate-400 hover:bg-white/[0.035] hover:text-white"
                    >
                      <Settings className="h-4 w-4" /> Configurações
                    </button>
                    <button
                      ref={(element) => {
                        userMenuItemsRef.current[2] = element;
                      }}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setLogoutConfirmOpen(true);
                      }}
                      className="dashboard-focus flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs text-red-300 hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" /> Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-9">
            {renderSection()}
          </div>
        </section>
      </div>

      {selectedLead && (
        <div
          className="dashboard-dialog fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLeadDetails();
          }}
        >
          <section
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-details-title"
            aria-describedby="lead-details-description"
            tabIndex={-1}
            className="dashboard-modal w-full max-w-lg rounded-2xl border border-white/10 bg-[#070a10] p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">Detalhes do lead</p>
                <h2 id="lead-details-title" className="mt-1 text-xl font-semibold">
                  {selectedLead.company}
                </h2>
                <p id="lead-details-description" className="mt-1 text-xs text-slate-600">
                  Informações comerciais e de localização do lead selecionado.
                </p>
              </div>
              <button
                type="button"
                aria-label={`Fechar detalhes de ${selectedLead.company}`}
                onClick={closeLeadDetails}
                className="dashboard-focus rounded-lg px-2 py-1 text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <Detail label="Segmento" value={selectedLead.segment} />
              <Detail label="Localização" value={selectedLead.location} />
              <Detail label="Website" value={selectedLead.website} />
              <Detail label="Potencial" value={selectedLead.potential} />
            </dl>
          </section>
        </div>
      )}

      {logoutConfirmOpen && (
        <div
          className="dashboard-dialog fixed inset-0 z-[85] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLogoutConfirmOpen(false);
          }}
        >
          <section
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            tabIndex={-1}
            className="dashboard-modal w-full max-w-md rounded-2xl border border-white/10 bg-[#070a10] p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2 id="logout-title" className="text-lg font-semibold">
              Sair da conta?
            </h2>
            <p id="logout-description" className="mt-2 text-sm leading-6 text-slate-500">
              Sua sessão local será limpa e você será redirecionado para a tela de login.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setLogoutConfirmOpen(false)}
                className="dashboard-focus rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="dashboard-focus rounded-xl bg-red-500/90 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
              >
                Sair
              </button>
            </div>
          </section>
        </div>
      )}

      <div
        className={`dashboard-toast fixed bottom-4 right-4 z-[90] flex max-w-sm items-center gap-3 rounded-xl border border-white/10 bg-[#0b1220]/95 px-4 py-3 text-sm text-slate-200 shadow-2xl ${notice ? "dashboard-toast-visible" : "dashboard-toast-hidden"}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="min-w-0 flex-1">{notice}</span>
        <button
          type="button"
          aria-label="Fechar aviso"
          onClick={() => setNotice("")}
          className="dashboard-focus rounded-md px-2 py-1 text-slate-500 hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}

function DashboardOverview({
  query,
  location,
  setQuery,
  setLocation,
  onSearch,
  onNewSearch,
}: {
  query: string;
  location: string;
  setQuery: (value: string) => void;
  setLocation: (value: string) => void;
  onSearch: () => void;
  onNewSearch: () => void;
}) {
  return (
    <section id="painel" className="scroll-mt-24">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-blue-400">
            <Sparkles className="h-3.5 w-3.5" /> Seu workspace está ativo
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Olá, Ruan. Vamos encontrar clientes?
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Encontre empresas, organize seus leads e transforme oportunidades em novos negócios.
          </p>
        </div>
        <button
          type="button"
          onClick={onNewSearch}
          className="dashboard-focus inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/10 transition hover:-translate-y-0.5 hover:bg-blue-500 md:w-auto"
        >
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
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070a10]">
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
          <form
            role="search"
            aria-label="Pesquisar novos leads"
            onSubmit={(event) => {
              event.preventDefault();
              onSearch();
            }}
            className="grid gap-3 p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-4"
          >
            <Field label="Nicho" value={query || "Clínicas odontológicas"} onChange={setQuery} icon={<Users />} />
            <Field label="Localização" value={location} onChange={setLocation} icon={<MapPin />} />
            <Field label="Website" value="Com website" icon={<Globe2 />} />
            <button
              type="submit"
              className="dashboard-focus h-11 self-end rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
            >
              <Search className="mr-2 inline h-4 w-4" /> Pesquisar
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#070a10] p-5 sm:p-6" aria-label="Uso do plano">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Uso do plano</p>
              <p className="mt-1 text-2xl font-semibold">74%</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
            <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-600">
            <span>740 usados</span>
            <span>260 restantes</span>
          </div>
          <p className="mt-5 rounded-xl bg-white/[0.025] p-3 text-[11px] leading-5 text-slate-500">
            Você está usando bem seu plano. Faça upgrade quando precisar de mais pesquisas.
          </p>
        </section>
      </div>
    </section>
  );
}

function LeadsSection({
  search,
  setSearch,
  filtered,
  filterHighPotential,
  setFilterHighPotential,
  exportLeads,
  onOpenDetails,
  onClear,
}: {
  search: string;
  setSearch: (value: string) => void;
  filtered: Lead[];
  filterHighPotential: boolean;
  setFilterHighPotential: (value: boolean) => void;
  exportLeads: () => void;
  onOpenDetails: (lead: Lead, trigger: HTMLElement) => void;
  onClear: () => void;
}) {
  return (
    <section id="leads" className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070a10]" aria-labelledby="leads-title">
      <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 id="leads-title" className="font-semibold">Resultados recentes</h1>
            <span className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-slate-500">
              {filtered.length} resultados
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-600">Empresas encontradas nas suas últimas pesquisas.</p>
        </div>

        <div className="flex gap-2">
          <form
            role="search"
            aria-label="Buscar nos resultados"
            className="relative min-w-0 flex-1 sm:w-56"
            onSubmit={(event) => event.preventDefault()}
          >
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" aria-hidden="true" />
            <label htmlFor="dashboard-search" className="sr-only">
              Buscar nos resultados
            </label>
            <input
              id="dashboard-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar nos resultados..."
              autoComplete="off"
              className="dashboard-focus h-9 w-full rounded-lg border border-white/[0.07] bg-white/[0.02] pl-9 pr-9 text-xs text-slate-300 placeholder:text-slate-700"
            />
            {search && (
              <button
                type="button"
                aria-label="Limpar busca"
                onClick={() => setSearch("")}
                className="dashboard-focus absolute right-1 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
          <button
            type="button"
            aria-label="Filtrar apenas leads de alto potencial"
            aria-pressed={filterHighPotential}
            onClick={() => setFilterHighPotential(!filterHighPotential)}
            className={`dashboard-focus grid h-9 w-9 place-items-center rounded-lg border border-white/[0.07] text-slate-500 transition hover:bg-white/[0.03] hover:text-white ${filterHighPotential ? "bg-blue-500/10 text-blue-300" : ""}`}
          >
            <Filter className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={exportLeads}
            disabled={!filtered.length}
            className="dashboard-focus hidden items-center gap-2 rounded-lg border border-white/[0.07] px-3 text-xs text-slate-400 transition hover:bg-white/[0.03] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" /> Exportar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <caption className="sr-only">Resultados de leads encontrados</caption>
          <thead className="border-b border-white/[0.05] bg-white/[0.01] text-[9px] uppercase tracking-[0.16em] text-slate-600">
            <tr>
              <th scope="col" className="px-5 py-3.5 font-medium">Empresa</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Segmento</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Localização</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Website</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Potencial</th>
              <th scope="col" className="px-5 py-3.5"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="group border-b border-white/[0.05] last:border-0 transition hover:bg-white/[0.025]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-400" aria-hidden="true">
                      {lead.company[0]}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{lead.company}</p>
                      <p className="mt-0.5 text-[10px] text-slate-600">Empresa verificada</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-slate-500">{lead.segment}</td>
                <td className="px-5 py-4 text-xs text-slate-500">{lead.location}</td>
                <td className="px-5 py-4 text-xs text-blue-400">{lead.website}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-md px-2 py-1 text-[10px] font-medium ${lead.potential === "Alto" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"}`}>
                    {lead.potential}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Ver detalhes de ${lead.company}`}
                    onClick={(event) => onOpenDetails(lead, event.currentTarget)}
                    className="dashboard-focus rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-slate-600 opacity-0 transition focus-visible:opacity-100 group-hover:opacity-100 hover:bg-white/5 hover:text-white"
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center" role="status" aria-live="polite">
            <Search className="mx-auto h-6 w-6 text-slate-700" aria-hidden="true" />
            <p className="mt-3 text-sm text-slate-500">Nenhum lead encontrado para sua busca.</p>
            <button
              type="button"
              onClick={onClear}
              className="dashboard-focus mt-4 rounded-lg px-3 py-2 text-xs font-semibold text-blue-400 hover:bg-white/5"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.05] px-5 py-3 text-[10px] text-slate-600">
        <span>Mostrando {filtered.length} de {dashboardLeads.length} leads</span>
        <button
          type="button"
          onClick={onClear}
          className="dashboard-focus rounded px-1 text-blue-400 hover:text-blue-300"
        >
          Ver todos →
        </button>
      </div>
    </section>
  );
}

function ListsSection({ onNotify }: { onNotify: (message: string) => void }) {
  return (
    <section id="listas" className="scroll-mt-24 rounded-2xl border border-white/[0.07] bg-[#070a10] p-6 sm:p-8" aria-labelledby="lists-title">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium text-blue-400">Workspace</p>
          <h1 id="lists-title" className="mt-2 text-2xl font-semibold">Minhas listas</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Organize seus leads em listas de prospecção para acompanhar oportunidades por segmento.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNotify("A lista de prospecção foi preparada para receber novos leads.")}
          className="dashboard-focus rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold hover:bg-blue-500"
        >
          <Plus className="mr-2 inline h-4 w-4" /> Nova lista
        </button>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {["Clínicas", "Empresas locais", "Alto potencial"].map((name, index) => (
          <article key={name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <Building2 className="h-5 w-5 text-blue-400" />
            <h2 className="mt-4 text-sm font-semibold">{name}</h2>
            <p className="mt-1 text-xs text-slate-600">{[12, 8, 15][index]} leads salvos</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReportsSection() {
  return (
    <section id="relatorios" className="scroll-mt-24 rounded-2xl border border-white/[0.07] bg-[#070a10] p-6 sm:p-8" aria-labelledby="reports-title">
      <p className="text-xs font-medium text-blue-400">Analytics</p>
      <h1 id="reports-title" className="mt-2 text-2xl font-semibold">Relatórios</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
        Acompanhe o desempenho da prospecção com indicadores claros e prontos para expansão.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <ReportMetric label="Leads encontrados" value="2.481" />
        <ReportMetric label="Pesquisas" value="184" />
        <ReportMetric label="Empresas salvas" value="327" />
        <ReportMetric label="Oportunidades" value="23,8%" />
      </div>
    </section>
  );
}

function SettingsSection({ onLogout }: { onLogout: () => void }) {
  return (
    <section id="configuracoes" className="scroll-mt-24 rounded-2xl border border-white/[0.07] bg-[#070a10] p-6 sm:p-8" aria-labelledby="settings-title">
      <p className="text-xs font-medium text-blue-400">Conta</p>
      <h1 id="settings-title" className="mt-2 text-2xl font-semibold">Configurações</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <User className="h-5 w-5 text-blue-400" />
          <h2 className="mt-4 text-sm font-semibold">Perfil</h2>
          <p className="mt-1 text-xs leading-5 text-slate-600">Ruan · Workspace WEBNOVA IA</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <Settings className="h-5 w-5 text-blue-400" />
          <h2 className="mt-4 text-sm font-semibold">Preferências</h2>
          <p className="mt-1 text-xs leading-5 text-slate-600">Configurações de conta e experiência do dashboard.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="dashboard-focus mt-8 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10"
      >
        <LogOut className="mr-2 inline h-4 w-4" /> Sair da conta
      </button>
    </section>
  );
}

function ReportMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <p className="text-xs text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-slate-600">{label}</dt>
      <dd className="mt-1 text-sm text-slate-300">{value}</dd>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  change,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#070a10] p-5 transition hover:-translate-y-0.5 hover:border-blue-500/20">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400 [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
        <span className="rounded-md bg-emerald-500/[0.06] px-2 py-1 text-[9px] font-medium text-emerald-400">
          {change}
        </span>
      </div>
      <p className="mt-5 text-xs text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  icon: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600">
        {label}
      </span>
      <div className="flex h-11 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 transition focus-within:border-blue-500/30">
        <span className="text-blue-400 [&>svg]:h-3.5 [&>svg]:w-3.5" aria-hidden="true">
          {icon}
        </span>
        <input
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          readOnly={!onChange}
          className="dashboard-focus min-w-0 flex-1 bg-transparent text-xs text-slate-300"
        />
      </div>
    </label>
  );
}
