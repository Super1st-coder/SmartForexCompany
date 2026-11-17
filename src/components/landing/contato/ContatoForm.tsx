"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Target, TrendingUp } from "lucide-react";
import { trackMetaFormConversion } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";

type Goal = "experienced" | "info";

const GOALS: Array<{
  id: Goal;
  title: string;
  subtitle: string;
  icon: typeof Target;
}> = [
  {
    id: "experienced",
    title: "Já tenho experiência, quero investir",
    subtitle: "Quero copiar a estratégia com capital real",
    icon: TrendingUp,
  },
  {
    id: "info",
    title: "Quero mais informações",
    subtitle: "Preciso entender o copy trading antes de entrar",
    icon: Target,
  },
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function nameFromEmail(email: string) {
  const local = email.split("@")[0]?.replace(/[._+-]+/g, " ").trim() || "Lead";
  const cleaned = local.replace(/\d+/g, " ").replace(/\s+/g, " ").trim();
  if (cleaned.length >= 2) {
    return cleaned
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
      .slice(0, 80);
  }
  return "Lead Contato BR";
}

export function ContatoForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const progress = step === 1 ? 50 : 100;

  const goalLabel = useMemo(() => {
    if (goal === "experienced") return "Já tenho experiência, quero investir";
    if (goal === "info") return "Quero mais informações";
    return "";
  }, [goal]);

  function selectGoal(next: Goal) {
    setGoal(next);
    setError("");
    // Auto-advance after short selection feedback
    window.setTimeout(() => setStep(2), 280);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!goal) {
      setError("Selecione o seu objetivo para continuar.");
      setStep(1);
      return;
    }
    if (!isValidEmail(email)) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("Informe um WhatsApp válido com DDD (ex: +55 11 99999-9999).");
      return;
    }

    setStatus("loading");

    const payload = {
      name: nameFromEmail(email),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: [
        "Lead landing /contato (campanha BR)",
        `Objetivo: ${goalLabel}`,
        "Origem: smartforexpro.com/contato",
        "Contato prioritário solicitado (24h).",
      ].join("\n"),
      type: "lead" as const,
      website: honeypot,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Não foi possível enviar. Tente novamente.");
      }
      trackMetaFormConversion({
        form: "contato",
        formType: "lead",
        contentName: goalLabel || "Landing /contato",
        contentCategory: "landing_contato",
      });
      router.push("/obrigado");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível enviar. Tente novamente."
      );
    }
  }

  return (
    <div>
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[var(--ln-muted)]">
          <span>Etapa {step} de 2</span>
          <span className="text-[var(--ln-cyan)]">{progress}%</span>
        </div>
        <div className="ln-progress-track h-1.5 rounded-full">
          <div
            className="ln-progress-fill h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === 1 ? (
        <div className="ln-fade-up" key="step-1">
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
            Qual é o seu objetivo?
          </h3>
          <p className="mt-2 text-sm text-[var(--ln-muted)]">
            Escolha uma opção. Leva menos de 10 segundos.
          </p>

          <div className="mt-6 grid gap-3">
            {GOALS.map((item) => {
              const Icon = item.icon;
              const selected = goal === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectGoal(item.id)}
                  className={cn(
                    "ln-option flex min-h-[4.5rem] w-full items-start gap-4 rounded-2xl px-4 py-4 text-left sm:px-5",
                    selected && "ln-option-selected"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                      selected
                        ? "border-[rgba(0,255,157,0.5)] bg-[rgba(0,255,157,0.12)] text-[var(--ln-green)]"
                        : "border-[rgba(0,245,255,0.25)] bg-[rgba(0,245,255,0.06)] text-[var(--ln-cyan)]"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-white">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-[var(--ln-muted)]">
                      {item.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {goal ? (
            <button
              type="button"
              className="ln-cta ln-cta-pulse mt-5 w-full rounded-2xl px-6 py-3.5 text-base"
              onClick={() => setStep(2)}
            >
              Continuar
            </button>
          ) : null}
        </div>
      ) : (
        <form className="ln-fade-up" key="step-2" onSubmit={handleSubmit} noValidate>
          <button
            type="button"
            className="mb-3 text-xs font-medium text-[var(--ln-cyan)] hover:underline"
            onClick={() => setStep(1)}
          >
            ← Voltar
          </button>
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
            Quase lá! Deixe seus dados para contato prioritário
          </h3>
          <p className="mt-2 text-sm text-[var(--ln-muted)]">
            Vagas limitadas esta semana · Resposta em até 24h
          </p>

          {/* Honeypot */}
          <div
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="contato-website">Site</label>
            <input
              id="contato-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="contato-email"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                E-mail
              </label>
              <input
                id="contato-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="seu@email.com"
                className="ln-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="contato-phone"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                WhatsApp / Telefone
              </label>
              <input
                id="contato-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="+55 11 99999-9999"
                className="ln-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Preferimos WhatsApp para contato prioritário.
              </p>
            </div>
          </div>

          {error || status === "error" ? (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="ln-cta ln-cta-pulse mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base sm:text-lg"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              "Quero acesso agora"
            )}
          </button>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
            Contato prioritário · Sem spam · Seus dados ficam protegidos
          </p>
        </form>
      )}
    </div>
  );
}
