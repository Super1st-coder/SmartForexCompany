"use client";

import Link from "next/link";
import {
  Check,
  Copy,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { VoirLesStatistiquesButton } from "@/components/affiliate/VoirLesStatistiquesButton";
import { SignUpButton } from "@/components/affiliate/SignUpButton";
import { ContatoForm } from "./ContatoForm";
import { cn } from "@/lib/utils";

export type ContatoMetricsDisplay = {
  winRate: string;
  avgMonthly: string;
  maxDd: string;
  monthNow: string;
  live: boolean;
};

type Props = {
  metrics: ContatoMetricsDisplay;
};

const BENEFITS = [
  {
    icon: Zap,
    title: "Execução automática",
    text: "As posições da estratégia são replicadas na sua conta, sem colar sinais à mão.",
  },
  {
    icon: ShieldCheck,
    title: "Gestão de risco rigorosa",
    text: "Foco em drawdown controlado e disciplina de longo prazo, não em hype de ganhos.",
  },
  {
    icon: Copy,
    title: "Conta real + métricas ao vivo",
    text: "Transparência de performance atualizada. Você vê o que a estratégia realmente entrega.",
  },
  {
    icon: Sparkles,
    title: "Onboarding prioritário",
    text: "Equipe em português para configurar corretamente capital, risco e cópia.",
  },
];

const TRUST = [
  "Conta real",
  "Transparência ao vivo",
  "Gestão de risco rigorosa",
];

export function ContatoLanding({ metrics }: Props) {
  const stats = [
    { label: "Win rate", value: metrics.winRate },
    { label: "Média mensal", value: metrics.avgMonthly },
    { label: "Drawdown máx.", value: metrics.maxDd },
    { label: "Mês atual", value: metrics.monthNow },
  ];

  return (
    <div className="landing-neon relative min-h-screen overflow-x-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="ln-grid absolute inset-0 opacity-80" />
        <div className="ln-glow-orb absolute -left-24 top-0 h-72 w-72 rounded-full bg-[rgba(0,245,255,0.14)]" />
        <div className="ln-glow-orb absolute -right-16 top-40 h-80 w-80 rounded-full bg-[rgba(0,255,157,0.1)]" />
        <div className="ln-glow-orb absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-[rgba(217,70,239,0.08)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,245,255,0.12),transparent_55%)]" />
      </div>

      {/* Minimal top bar */}
      <header className="relative z-20 border-b border-white/5 bg-[rgba(10,10,15,0.65)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo variant="light" href="/" />
          <div className="flex items-center gap-2 sm:gap-3">
            {metrics.live ? (
              <span className="hidden items-center gap-1.5 rounded-full border border-[rgba(0,255,157,0.35)] bg-[rgba(0,255,157,0.08)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--ln-green)] sm:inline-flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ln-green)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--ln-green)]" />
                </span>
                Ao vivo
              </span>
            ) : null}
            <VoirLesStatistiquesButton
              label="Ver as estatísticas"
              variant="ghost-neon"
              className="!min-h-9 !rounded-xl !px-3 !py-2 !text-xs sm:!text-sm"
            />
            <SignUpButton
              label="Inscrever-se"
              locale="pt-BR"
              variant="primary"
              className="!min-h-9 !rounded-xl !px-3 !py-2 !text-xs sm:!text-sm"
            />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="ln-fade-up lg:col-span-7">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(0,245,255,0.25)] bg-[rgba(0,245,255,0.06)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--ln-cyan)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Copy trading Forex · Estratégia real
                </p>

                <h1 className="font-display text-[1.85rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                  Copy trading automático com estratégia real:{" "}
                  <span className="bg-gradient-to-r from-[var(--ln-cyan)] via-[var(--ln-green)] to-[var(--ln-gold)] bg-clip-text text-transparent">
                    performance ao vivo, risco controlado
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--ln-muted)] sm:text-lg">
                  Replique automaticamente as posições de uma estratégia em conta
                  real (foco XAUUSD). Métricas transparentes, gestão de risco
                  rigorosa e acompanhamento em português. Vagas limitadas para
                  onboarding prioritário.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {TRUST.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 sm:text-sm"
                    >
                      <Check className="h-3.5 w-3.5 text-[var(--ln-green)]" />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="ln-stat rounded-2xl p-3.5 sm:p-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">
                        {s.label}
                      </p>
                      <p className="ln-stat-value mt-1 font-display text-xl font-bold tabular-nums sm:text-2xl">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-[11px] text-slate-500">
                  Resultados passados ≠ resultados futuros. Métricas de conta real
                  {metrics.live ? ", atualizadas regularmente" : ""}.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <SignUpButton
                    label="Inscrever-se"
                    locale="pt-BR"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  />
                  <VoirLesStatistiquesButton
                    label="Ver as estatísticas"
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>

              {/* Form card */}
              <div className="lg:col-span-5" id="formulario">
                <div
                  className={cn(
                    "ln-glass ln-glass-hot ln-fade-up sticky top-6 rounded-3xl p-5 sm:p-7",
                    "relative"
                  )}
                  style={{ animationDelay: "0.08s" }}
                >
                  <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-[rgba(0,245,255,0.25)] via-transparent to-[rgba(0,255,157,0.2)] opacity-60" />
                  <div className="relative">
                    <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ln-cyan)]">
                      Contato prioritário · 24h
                    </p>
                    <p className="mb-5 text-center text-xs text-slate-500">
                      Só 2 etapas · Sem compromisso · Vagas limitadas
                    </p>
                    <ContatoForm />
                    <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                      <p className="text-center text-xs text-slate-500">
                        Prefere ver a performance ou se inscrever agora?
                      </p>
                      <SignUpButton
                        label="Inscrever-se"
                        locale="pt-BR"
                        variant="primary"
                        size="lg"
                        className="w-full"
                      />
                      <VoirLesStatistiquesButton
                        label="Ver as estatísticas (FX Blue)"
                        variant="outline"
                        size="lg"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits strip */}
        <section className="border-y border-white/5 bg-[rgba(8,10,16,0.55)] px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ln-cyan)]">
                Por que Smart Forex Pro
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Estrutura. Risco. Automação.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="ln-glass rounded-2xl p-5 transition hover:border-[rgba(0,245,255,0.35)] hover:shadow-[0_0_28px_rgba(0,245,255,0.12)]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,245,255,0.3)] bg-[rgba(0,245,255,0.08)] text-[var(--ln-cyan)] shadow-[0_0_16px_rgba(0,245,255,0.2)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ln-muted)]">
                      {b.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Risk + footer */}
        <footer className="border-t border-white/5 px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] leading-relaxed text-slate-500 sm:text-xs">
              <strong className="font-semibold text-slate-400">Aviso de risco:</strong>{" "}
              o trading de CFD e moedas envolve alto risco de perda de capital. Os
              resultados passados não garantem performance futura. As métricas
              exibidas referem-se a um histórico de conta real e têm caráter
              informativo. Você é o único responsável pelas suas decisões de
              investimento.
            </p>
            <p className="mt-4 text-[11px] text-slate-600">
              © {new Date().getFullYear()} Smart Forex Pro ·{" "}
              <Link href="/" className="text-slate-500 hover:text-[var(--ln-cyan)]">
                Site principal
              </Link>
              {" · "}
              <Link
                href="/politique-de-confidentialite"
                className="text-slate-500 hover:text-[var(--ln-cyan)]"
              >
                Privacidade
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
