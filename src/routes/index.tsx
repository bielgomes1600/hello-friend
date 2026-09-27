import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, BarChart3, Check, ChevronDown, Database, Globe2, ShieldCheck,
  Sparkles, Target, Users, Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

export const Route = createFileRoute("/")({ component: SalesPage });

const faqs = [
  ["O que é o SaaS?","É uma plataforma de prospecção que ajuda você a encontrar empresas e potenciais clientes usando filtros como nicho e localização, organizando os resultados para o seu processo comercial."],
  ["Preciso instalar algum programa?","Não. O sistema funciona diretamente pelo navegador. Você entra na sua conta e começa a pesquisar."],
  ["Posso cancelar minha assinatura?","Sim. Os planos são mensais e você pode cancelar a renovação quando quiser."],
  ["Como recebo os leads?","Os resultados ficam organizados dentro da plataforma e podem ser exportados conforme o plano contratado."],
];

function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: any
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)

    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    // Initial resize
    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-screen"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}

function IntroOverlay() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 4200)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black intro-overlay">
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative text-center intro-content">
          <div className="mb-5 flex items-center justify-center gap-3 intro-line">
            <span className="h-px w-10 bg-blue-500/60 sm:w-16" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.42em] text-blue-300/70">
              INTELLIGENT PROSPECTING
            </span>
            <span className="h-px w-10 bg-blue-500/60 sm:w-16" />
          </div>

          <div className="relative inline-block">
            <h2 className="intro-webnova-text relative text-center text-5xl font-black tracking-[-0.075em] text-white sm:text-7xl md:text-8xl lg:text-[9rem]">
              WEB<span className="text-blue-500">NOVA</span>
            </h2>

            <div className="intro-webnova-glow pointer-events-none absolute inset-0 text-center text-5xl font-black tracking-[-0.075em] text-blue-500 blur-2xl sm:text-7xl md:text-8xl lg:text-[9rem]">
              WEB<span className="text-blue-500">NOVA</span>
            </div>

            <div className="intro-scanline pointer-events-none absolute left-[-8%] right-[-8%] top-1/2 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
            <div className="intro-light-sweep pointer-events-none absolute inset-y-[-18%] w-20 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent blur-sm" />
          </div>

          <p className="intro-tagline mt-5 text-xs font-medium uppercase tracking-[0.32em] text-blue-200/75 sm:text-sm">
            EXPANDA SEU POTENCIAL
          </p>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 intro-progress">
        <div className="h-px w-28 overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left bg-blue-500" />
        </div>
      </div>

      <style>{`
        @keyframes introContentIn {
          0% { opacity: 0; transform: translateY(14px) scale(.97); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes introContentOut {
          0% { opacity: 1; transform: scale(1); filter: blur(0); }
          100% { opacity: 0; transform: scale(1.035); filter: blur(5px); }
        }
        @keyframes introGlowPulse {
          0%, 100% { opacity: .38; transform: scale(.985); }
          50% { opacity: .82; transform: scale(1.015); }
        }
        @keyframes introLightSweep {
          0% { left: -22%; opacity: 0; }
          12% { opacity: .95; }
          42% { opacity: 1; }
          62% { opacity: .25; }
          100% { left: 122%; opacity: 0; }
        }
        @keyframes introLineReveal {
          0% { width: 0; opacity: 0; }
          35% { opacity: 1; }
          100% { width: 100%; opacity: .8; }
        }
        @keyframes introProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .intro-content {
          animation:
            introContentIn .7s cubic-bezier(.16,1,.3,1) forwards,
            introContentOut .6s cubic-bezier(.7,0,.84,0) 3.45s forwards;
        }
        .intro-line {
          animation: introContentIn .55s ease-out .08s both;
        }
        .intro-webnova-glow {
          animation: introGlowPulse 1.6s ease-in-out infinite;
        }
        .intro-light-sweep {
          animation: introLightSweep 1.35s cubic-bezier(.2,.75,.25,1) .62s forwards;
        }
        .intro-scanline {
          animation: introLineReveal 1.1s ease-out .35s both;
        }
        .intro-tagline {
          animation: introContentIn .65s ease-out .38s both;
        }
        .intro-progress > div {
          animation: introProgress 3.85s linear .12s forwards;
        }
        .intro-overlay {
          animation: introContentOut .55s cubic-bezier(.7,0,.84,0) 2.72s forwards;
        }
      `}</style>
    </div>
  )
}

function SalesPage() {
  const [openFaq,setOpenFaq]=useState<number|null>(null);
  const plans = [
    { name:"Grátis", price:"0", leads:"Até 5 pesquisas de leads", description:"Teste a plataforma sem pagar.", features:["5 pesquisas de leads","Filtros básicos","Pesquisa de empresas","Sem exportação"] },
    { name:"Starter", price:"30", leads:"1.000 leads / mês", description:"Para começar a prospectar com mais volume.", popular:true, features:["1.000 leads por mês","Filtros de pesquisa","Dados de contato","Exportação CSV"] },
    { name:"Pro", price:"99", leads:"5.000 leads / mês", description:"Para equipes que prospectam diariamente.", features:["5.000 leads por mês","Busca avançada","Qualificação de leads","Exportações ilimitadas","Suporte prioritário"] },
    { name:"Scale", price:"299", leads:"20.000 leads / mês", description:"Para operações comerciais em escala.", features:["20.000 leads por mês","Filtros avançados","Qualificação automática","Exportações ilimitadas","Suporte prioritário"] },
  ];
  return <><IntroOverlay /><main className="min-h-screen overflow-hidden bg-[#05070b] text-white">
    <style>{`@keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.015)}}`}</style>
    <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,.22),transparent_38%),radial-gradient(circle_at_100%_35%,rgba(14,165,233,.10),transparent_28%)]"/>
    <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
      <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25"><Target className="h-5 w-5"/></span><span className="text-lg">WEBNOVA IA</span></a>
      <div className="hidden items-center gap-7 text-sm text-slate-400 md:flex"><a href="#beneficios" className="hover:text-white">Benefícios</a><a href="#como-funciona" className="hover:text-white">Como funciona</a><a href="#planos" className="hover:text-white">Planos</a><a href="#faq" className="hover:text-white">FAQ</a></div>
      <a href="/login" className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold hover:bg-white/[0.09]">Entrar</a>
    </nav>

    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pt-28">
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

    <section className="relative z-10 overflow-hidden border-y border-white/5 bg-[#080b11] px-6 py-20 lg:px-8 lg:py-24"><div className="mx-auto max-w-6xl text-center"><p className="text-sm font-bold tracking-wider text-blue-400">CONECTANDO OPORTUNIDADES</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Sua prospecção conectada ao mundo.</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">A WEBNOVA IA ajuda você a descobrir novas oportunidades e conectar sua empresa aos clientes certos.</p><div className="relative mx-auto mt-10 flex h-[390px] max-w-3xl items-center justify-center overflow-hidden rounded-3xl border border-blue-500/10 bg-[#030509] shadow-2xl shadow-blue-950/30"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,.16),transparent_45%)]"/><div className="absolute h-64 w-64 sm:h-72 sm:w-72 animate-[float_7s_ease-in-out_infinite]"><div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(125,211,252,.95),rgba(37,99,235,.72)_38%,rgba(8,47,73,.96)_72%,rgba(2,6,23,1)_100%)] shadow-[inset_-22px_-18px_45px_rgba(0,0,0,.55),inset_16px_14px_28px_rgba(186,230,253,.16),0_0_70px_rgba(37,99,235,.22)]"/><div className="absolute inset-[8%] overflow-hidden rounded-full"><div className="absolute -left-[3%] top-[18%] h-[24%] w-[38%] rotate-[-18deg] rounded-[48%_52%_45%_55%] bg-blue-100/25"/><div className="absolute left-[18%] top-[8%] h-[31%] w-[24%] rotate-[18deg] rounded-[55%_42%_58%_40%] bg-cyan-200/30"/><div className="absolute right-[7%] top-[29%] h-[22%] w-[34%] rotate-[22deg] rounded-[45%_55%_38%_62%] bg-blue-100/20"/><div className="absolute left-[8%] bottom-[10%] h-[28%] w-[42%] rotate-[12deg] rounded-[62%_38%_48%_52%] bg-cyan-100/20"/><div className="absolute right-[16%] bottom-[17%] h-[20%] w-[27%] rotate-[-24deg] rounded-[42%_58%_55%_45%] bg-blue-100/20"/></div><div className="absolute left-[18%] top-[12%] h-[24%] w-[28%] rounded-full bg-white/15 blur-2xl"/><div className="absolute inset-0 rounded-full ring-1 ring-white/10"/></div><div className="absolute h-44 w-44 rounded-full bg-blue-600/20 blur-3xl"/><div className="relative grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_50px_rgba(37,99,235,.12)]"><Globe2 className="h-11 w-11 text-blue-200/70"/></div></div><div className="mx-auto mt-8 max-w-2xl"><p className="text-2xl font-semibold tracking-tight sm:text-3xl">Ajudamos a realizar seus sonhos, suas prospecções.</p><p className="mt-3 text-sm leading-6 text-slate-500">Transforme novas conexões em oportunidades para o crescimento do seu negócio.</p></div></div></section>

    <section id="planos" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8"><div className="text-center"><p className="text-sm font-bold tracking-wider text-blue-400">ASSINATURA</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Escolha seu plano e comece a prospectar.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">Planos mensais para diferentes volumes de prospecção.</p></div><div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">{plans.map(plan=><div key={plan.name} className={`relative rounded-2xl border p-7 ${plan.popular?"border-blue-500/60 bg-blue-500/[0.06] shadow-2xl shadow-blue-950/20":"border-white/8 bg-white/[0.02]"}`}>{plan.popular&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Mais escolhido</div>}<h3 className="text-lg font-semibold">{plan.name}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">{plan.description}</p><div className="mt-6"><span className="text-4xl font-semibold">R$ {plan.price}</span><span className="text-sm text-slate-500"> / mês</span></div><p className="mt-2 text-xs font-medium text-blue-400">{plan.leads}</p><a href="#checkout" className={`mt-7 block w-full rounded-xl px-4 py-3 text-center text-sm font-bold transition ${plan.popular?"bg-blue-600 hover:bg-blue-500":"border border-white/10 bg-white/[0.05] hover:bg-white/[0.09]"}`}>Assinar {plan.name}</a><div className="mt-7 space-y-3 border-t border-white/8 pt-6">{plan.features.map(f=><div key={f} className="flex items-center gap-2.5 text-sm text-slate-300"><Check className="h-4 w-4 shrink-0 text-blue-400"/>{f}</div>)}</div></div>)}</div></section>

    <section id="checkout" className="relative z-10 px-6 pb-24 lg:px-8"><div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-transparent p-8 text-center sm:p-12"><ShieldCheck className="mx-auto h-8 w-8 text-blue-400"/><h2 className="mt-5 text-3xl font-semibold tracking-tight">Pronto para começar sua prospecção?</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">Escolha um plano, crie sua conta e tenha acesso à plataforma de leads.</p><a href="#planos" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold hover:bg-blue-500">Escolher meu plano <ArrowRight className="h-4 w-4"/></a></div></section>

    <section id="faq" className="relative z-10 mx-auto max-w-3xl px-6 pb-24 lg:px-8"><div className="text-center"><p className="text-sm font-bold tracking-wider text-blue-400">FAQ</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Perguntas frequentes</h2></div><div className="mt-10 divide-y divide-white/8 rounded-2xl border border-white/8 bg-white/[0.02]">{faqs.map(([q,a],i)=><button key={q} onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full px-6 py-5 text-left"><div className="flex items-center justify-between gap-5"><span className="text-sm font-medium">{q}</span><ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition ${openFaq===i?"rotate-180":""}`}/></div>{openFaq===i&&<p className="mt-3 pr-8 text-sm leading-6 text-slate-500">{a}</p>}</button>)}</div></section>

    <footer className="relative z-10 border-t border-white/5 px-6 py-8 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-slate-600 sm:flex-row"><div className="font-semibold text-slate-400">WEBNOVA IA</div><p>Prospecção inteligente para sua operação comercial.</p><div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5"/> Segurança e privacidade</div></div></footer>
  </main></>;
}

function SearchIcon(){ return <span className="[&>svg]:h-5 [&>svg]:w-5"><Target/></span>; }
function HowStep({number,icon,title,text}:{number:string;icon:ReactNode;title:string;text:string}){return <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 text-left"><div className="flex items-center justify-between"><span className="text-sm font-bold text-blue-400">{number}</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span></div><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text}</p></div>}
function MiniInfo({icon,title,text}:{icon:ReactNode;title:string;text:string}){return <div className="flex items-start gap-3"><span className="mt-0.5 text-blue-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div><p className="text-xs font-semibold text-slate-300">{title}</p><p className="mt-1 text-[11px] leading-5 text-slate-600">{text}</p></div></div>}
function Feature({icon,title,text}:{icon:ReactNode;title:string;text:string}){return <div className="bg-[#05070b] p-8 lg:p-10"><div className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/10 bg-blue-500/10 text-blue-400 [&>svg]:h-5 [&>svg]:w-5">{icon}</div><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{text}</p></div>}
