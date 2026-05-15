import { ArrowLeft, Printer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { patient } from '../data/eliane';

type Props = {
  onBack: () => void;
  title: string;
  professional: string;
  registry: string;
  specialty: string;
  score: number;
  scoreLabel: string;
  theme: 'green' | 'blue' | 'orange';
  Icon: LucideIcon;
  children: ReactNode;
};

const themes = {
  green:  {
    grad: 'from-emerald-600 to-emerald-700',
    pill: 'bg-emerald-100 text-emerald-700',
    badge: 'bg-emerald-500',
  },
  blue:   {
    grad: 'from-blue-600 to-blue-700',
    pill: 'bg-blue-100 text-blue-700',
    badge: 'bg-blue-500',
  },
  orange: {
    grad: 'from-orange-500 to-orange-700',
    pill: 'bg-orange-100 text-orange-700',
    badge: 'bg-orange-500',
  },
};

export default function DetailLayout({
  onBack, title, professional, registry, specialty, score, scoreLabel,
  theme, Icon, children,
}: Props) {
  const t = themes[theme];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top action bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          <span className="hidden xs:inline">Voltar ao Dashboard</span>
          <span className="xs:hidden">Voltar</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5"
        >
          <Printer className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hidden sm:inline">Imprimir parecer</span>
          <span className="sm:hidden">Imprimir</span>
        </button>
      </div>

      {/* Hero header */}
      <div className={`bg-gradient-to-br ${t.grad} text-white px-4 sm:px-8 py-6 sm:py-8`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-3 sm:gap-4 flex-wrap">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider opacity-80">{specialty}</div>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold mt-1 leading-tight">{title}</h1>
              <div className="text-xs sm:text-sm opacity-90 mt-1.5 sm:mt-2">
                <strong>{professional}</strong> · {registry}
              </div>
              <div className="text-[11px] sm:text-xs opacity-75 mt-1">
                Paciente: <strong>{patient.name}</strong> · {patient.age} anos · {patient.gender} · ID {patient.id}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-3">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider opacity-80">Score</div>
                <div className="text-3xl sm:text-4xl font-extrabold leading-none mt-1">{score}</div>
                <div className="text-[10px] sm:text-[11px] opacity-90 mt-1">{scoreLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-3 sm:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
        {children}
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-3 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-slate-200">
        <div className="text-[10px] sm:text-[11px] text-slate-500 space-y-1">
          <div>Documento gerado em 15/05/2026 — válido até a próxima avaliação.</div>
          <div>Este parecer é parte do acompanhamento multidisciplinar integrado da paciente {patient.name}.</div>
          <div>NutriSaúde © 2026 — Acompanhamento Clínico Integrado.</div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Componentes auxiliares ─── */

export function Section({ title, icon: Icon, children }: {
  title: string; icon?: LucideIcon; children: ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-card p-4 sm:p-6 md:p-8">
      <h2 className="text-base sm:text-xl font-extrabold text-slate-800 flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600 flex-shrink-0" />}
        {title}
      </h2>
      <div className="prose prose-slate max-w-none text-[13px] sm:text-[14px] leading-relaxed space-y-3 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export function MetricRow({
  label, current, previous, target, classification, status, interpretation,
}: {
  label: string;
  current: string;
  previous?: string;
  target?: string;
  classification: string;
  status: 'good' | 'attention' | 'risk' | 'excellent';
  interpretation: string;
}) {
  const statusStyles = {
    good:       { pill: 'bg-emerald-100 text-emerald-700',   ring: 'border-l-emerald-500' },
    excellent:  { pill: 'bg-emerald-100 text-emerald-700',   ring: 'border-l-emerald-600' },
    attention:  { pill: 'bg-amber-100 text-amber-700',       ring: 'border-l-amber-500' },
    risk:       { pill: 'bg-rose-100 text-rose-700',         ring: 'border-l-rose-500' },
  };
  const s = statusStyles[status];

  return (
    <div className={`border-l-4 ${s.ring} bg-slate-50 rounded-lg p-4`}>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className="text-[15px] font-bold text-slate-800">{label}</div>
          <div className="text-xl font-extrabold text-slate-900">{current}</div>
          {previous && (
            <div className="text-[12px] text-slate-500">
              (antes: <span className="font-semibold">{previous}</span>)
            </div>
          )}
          {target && (
            <div className="text-[12px] text-slate-500">
              · Meta: <span className="font-semibold">{target}</span>
            </div>
          )}
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${s.pill}`}>
          {classification}
        </span>
      </div>
      <p className="text-[13px] text-slate-600 leading-relaxed">{interpretation}</p>
    </div>
  );
}

export function ActionItem({ priority, title, detail }: {
  priority: 'alta' | 'media' | 'baixa';
  title: string;
  detail: string;
}) {
  const styles = {
    alta:  { pill: 'bg-rose-500 text-white',   label: 'Alta' },
    media: { pill: 'bg-amber-500 text-white',  label: 'Média' },
    baixa: { pill: 'bg-blue-500 text-white',   label: 'Baixa' },
  };
  const s = styles[priority];

  return (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${s.pill} flex-shrink-0 mt-0.5`}>
        {s.label}
      </span>
      <div className="min-w-0">
        <div className="text-[14px] font-bold text-slate-800">{title}</div>
        <div className="text-[13px] text-slate-600 leading-relaxed mt-0.5">{detail}</div>
      </div>
    </div>
  );
}

export function Reference({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] text-slate-500 leading-relaxed pl-4 border-l-2 border-slate-200">
      {children}
    </div>
  );
}

export function Highlight({ children, color = 'amber' }: {
  children: ReactNode; color?: 'amber' | 'rose' | 'blue' | 'emerald';
}) {
  const colors = {
    amber:   'bg-amber-50 border-amber-200 text-amber-900',
    rose:    'bg-rose-50 border-rose-200 text-rose-900',
    blue:    'bg-blue-50 border-blue-200 text-blue-900',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  };
  return (
    <div className={`border-l-4 ${colors[color]} rounded-r-lg p-4 my-3`}>
      {children}
    </div>
  );
}
