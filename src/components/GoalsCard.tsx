import { Target, Flame, Heart, Layers, Scale, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { first, latest, patient } from '../data/eliane';

type Goal = {
  icon: LucideIcon; iconColor: string; iconBg: string;
  name: string; unit: string;
  start: number; current: number; target: number;
  direction: 'down' | 'up';
};

const goals: Goal[] = [
  {
    icon: Scale, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-100',
    name: 'Peso Ideal', unit: 'kg',
    start: first.peso, current: latest.peso, target: patient.pesoIdeal,
    direction: 'down',
  },
  {
    icon: Flame, iconColor: 'text-amber-600', iconBg: 'bg-amber-100',
    name: 'Gordura Corporal', unit: '%',
    start: first.gorduraCorporal, current: latest.gorduraCorporal, target: 20,
    direction: 'down',
  },
  {
    icon: Heart, iconColor: 'text-rose-600', iconBg: 'bg-rose-100',
    name: 'Gordura Visceral', unit: '',
    start: first.gorduraVisceral, current: latest.gorduraVisceral, target: 3,
    direction: 'down',
  },
  {
    icon: Layers, iconColor: 'text-pink-600', iconBg: 'bg-pink-100',
    name: 'Gordura Subcutânea', unit: '%',
    start: first.gorduraSubcutanea, current: latest.gorduraSubcutanea, target: 18,
    direction: 'down',
  },
  {
    icon: Target, iconColor: 'text-blue-600', iconBg: 'bg-blue-100',
    name: 'Taxa Muscular', unit: '%',
    start: first.taxaMuscular, current: latest.taxaMuscular, target: 74,
    direction: 'up',
  },
  {
    icon: Sparkles, iconColor: 'text-cyan-600', iconBg: 'bg-cyan-100',
    name: 'Idade Metabólica', unit: 'anos',
    start: first.idadeMetabolica, current: latest.idadeMetabolica, target: 28,
    direction: 'down',
  },
];

const progress = (g: Goal) => {
  const totalGap = g.direction === 'down' ? g.start - g.target : g.target - g.start;
  const doneGap  = g.direction === 'down' ? g.start - g.current : g.current - g.start;
  if (totalGap <= 0) return 100;
  return Math.max(0, Math.min(100, Math.round((doneGap / totalGap) * 100)));
};

const fmt = (v: number, d = 1) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function GoalsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-3 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Metas Terapêuticas</h3>
        <span className="text-[11px] text-slate-500">Definidas pela equipe</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {goals.map((g, i) => {
          const pct = progress(g);
          const done = pct >= 100;
          const Icon = g.icon;
          return (
            <div key={i} className="border border-slate-100 rounded-xl p-3 hover:shadow-soft transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 ${g.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${g.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-slate-800 truncate">{g.name}</div>
                  <div className="text-[10px] text-slate-500">
                    Meta: {fmt(g.target, g.unit === 'anos' ? 0 : 1)}{g.unit}
                  </div>
                </div>
              </div>

              <div className="flex items-baseline justify-between mb-1.5">
                <div>
                  <span className="text-lg font-extrabold text-slate-800">
                    {fmt(g.current, g.unit === 'anos' ? 0 : 1)}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-1">{g.unit}</span>
                </div>
                <span className={`text-[11px] font-bold ${done ? 'text-emerald-600' : 'text-slate-600'}`}>
                  {pct}%
                </span>
              </div>

              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    done
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                      : 'bg-gradient-to-r from-brand-400 to-brand-600'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {done && (
                <div className="text-[10px] text-emerald-600 font-semibold mt-1.5">✓ Meta superada!</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
