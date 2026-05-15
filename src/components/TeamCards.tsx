import { Apple, Stethoscope, Dumbbell, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DetailView } from '../App';

type Item = { name: string; status: string; statusColor: string };
type Card = {
  key: DetailView;
  title: string;
  icon: LucideIcon; iconBg: string; iconColor: string;
  bg: string; border: string;
  score: number; scoreColor: string;
  professional: string; specialty: string;
  items: Item[];
  obs: string;
};

const cards: Card[] = [
  {
    key: 'nutritional',
    title: 'Análise Nutricional',
    icon: Apple, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600',
    bg: 'bg-gradient-to-br from-emerald-50 to-white', border: 'border-emerald-100',
    score: 90, scoreColor: 'text-emerald-600 bg-emerald-100',
    professional: 'Dra. Carolina Mendes', specialty: 'CRN 12.456 — Nutrição Clínica',
    items: [
      { name: 'Ingestão Calórica',        status: 'Adequada',  statusColor: 'text-emerald-600' },
      { name: 'Distribuição de Macros',   status: 'Excelente', statusColor: 'text-emerald-600' },
      { name: 'Hidratação',               status: 'Adequada',  statusColor: 'text-emerald-600' },
      { name: 'Proteína Corporal',        status: '18,5% ✓',   statusColor: 'text-emerald-600' },
    ],
    obs: 'Excelente aderência ao plano alimentar. A perda de 6,4 kg de gordura preservando a massa magra indica ingestão proteica adequada. Ajustar para 1,8 g/kg para acelerar a meta de gordura corporal < 20%.',
  },
  {
    key: 'endocrinological',
    title: 'Análise Endocrinológica',
    icon: Stethoscope, iconBg: 'bg-blue-100', iconColor: 'text-blue-600',
    bg: 'bg-gradient-to-br from-blue-50 to-white', border: 'border-blue-100',
    score: 85, scoreColor: 'text-blue-600 bg-blue-100',
    professional: 'Dr. Roberto Almeida', specialty: 'CRM 54.321 — Endocrinologia',
    items: [
      { name: 'Idade Metabólica',  status: '29 anos ✓',   statusColor: 'text-emerald-600' },
      { name: 'TMB',               status: '1.348 kcal',  statusColor: 'text-blue-600' },
      { name: 'Gordura Visceral',  status: '4,3 — Médio', statusColor: 'text-amber-600' },
      { name: 'IMC',               status: 'Saudável',    statusColor: 'text-emerald-600' },
    ],
    obs: 'Evolução metabólica extraordinária — idade metabólica caiu de 32 para 29 anos. Gordura visceral reduziu 45,6% (de 7,9 para 4,3), parâmetro mais crítico para risco cardiovascular. Manter o protocolo atual.',
  },
  {
    key: 'personal',
    title: 'Personal Trainer',
    icon: Dumbbell, iconBg: 'bg-orange-100', iconColor: 'text-orange-600',
    bg: 'bg-gradient-to-br from-orange-50 to-white', border: 'border-orange-100',
    score: 88, scoreColor: 'text-orange-600 bg-orange-100',
    professional: 'Prof. Ricardo Alves', specialty: 'CREF 67.890-G/SP',
    items: [
      { name: 'Performance',   status: 'Excelente',  statusColor: 'text-emerald-600' },
      { name: 'Força',         status: 'Evoluindo',  statusColor: 'text-blue-600' },
      { name: 'Resistência',   status: 'Excelente',  statusColor: 'text-emerald-600' },
      { name: 'Taxa Muscular', status: '72,8% ▲',    statusColor: 'text-emerald-600' },
    ],
    obs: 'Taxa muscular subiu de 67,3% para 72,8% — ganho proporcional excelente. Atenção: massa óssea reduziu (3,0→2,7 kg). Recomendo treinos de impacto e suplementação de Vitamina D + Cálcio.',
  },
];

export default function TeamCards({ onOpenDetail }: { onOpenDetail?: (v: DetailView) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div key={i} className={`${c.bg} border ${c.border} rounded-2xl shadow-card p-4 sm:p-5 flex flex-col gap-3`}>
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${c.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${c.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-800 leading-tight truncate">{c.title}</div>
                <div className="text-[11px] text-slate-500 truncate">{c.professional}</div>
              </div>
              <div className={`w-11 h-11 rounded-full ${c.scoreColor} flex items-center justify-center text-sm font-extrabold flex-shrink-0`}>
                {c.score}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-1.5">
              {c.items.map((it, j) => (
                <div key={j} className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
                    <span className="text-emerald-500 flex-shrink-0">✓</span>
                    <span className="truncate">{it.name}</span>
                  </div>
                  <span className={`font-semibold whitespace-nowrap ${it.statusColor}`}>{it.status}</span>
                </div>
              ))}
            </div>

            {/* Observation */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 text-[11px] text-slate-600 leading-relaxed border border-slate-100">
              <strong className="text-slate-700">Parecer:</strong> {c.obs}
            </div>

            <button
              onClick={() => onOpenDetail?.(c.key)}
              className={`text-xs font-semibold ${c.iconColor} flex items-center gap-1 hover:gap-2 transition-all cursor-pointer`}
            >
              Ver detalhes <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
