import { MdMonitorWeight, MdPercent, MdSpeed } from 'react-icons/md';
import { GiBiceps } from 'react-icons/gi';
import type { IconType } from 'react-icons';
import { first, latest } from '../data/eliane';

const fmt = (v: number, d = 1) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

type Card = {
  label: string;
  value: string;
  unit?: string;
  status?: string;
  delta: { value: string; positive: boolean };
  Icon: IconType;
  bg: string; color: string;
};

export default function KpiCards() {
  const cards: Card[] = [
    {
      label: 'Peso Atual', value: fmt(latest.peso, 1), unit: 'kg',
      delta: { value: `${fmt(latest.peso - first.peso, 1)} kg`, positive: latest.peso < first.peso },
      Icon: MdMonitorWeight, bg: 'bg-emerald-100', color: 'text-emerald-600',
    },
    {
      label: 'Massa Muscular', value: fmt(latest.massaMuscular, 1), unit: 'kg',
      delta: { value: `${fmt(latest.taxaMuscular - first.taxaMuscular, 1)}% taxa`, positive: latest.taxaMuscular > first.taxaMuscular },
      Icon: GiBiceps, bg: 'bg-blue-100', color: 'text-blue-600',
    },
    {
      label: 'Gordura Corporal', value: fmt(latest.gorduraCorporal, 1), unit: '%',
      delta: { value: `${fmt(latest.gorduraCorporal - first.gorduraCorporal, 1)}%`, positive: latest.gorduraCorporal < first.gorduraCorporal },
      Icon: MdPercent, bg: 'bg-amber-100', color: 'text-amber-600',
    },
    {
      label: 'IMC', value: fmt(latest.imc, 1), status: 'Saudável',
      delta: { value: `${fmt(latest.imc - first.imc, 1)}`, positive: latest.imc < first.imc },
      Icon: MdSpeed, bg: 'bg-violet-100', color: 'text-violet-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      {cards.map((c, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-card p-3 sm:p-4 flex items-start gap-2 sm:gap-3 min-w-0">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 ${c.bg} ${c.color} rounded-full flex items-center justify-center flex-shrink-0`}>
            <c.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] sm:text-[12px] text-slate-500 font-medium truncate">{c.label}</div>
            <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
              <span className="text-[22px] sm:text-[26px] font-extrabold text-slate-800 leading-none">{c.value}</span>
              {c.unit && <span className="text-[10px] sm:text-xs font-medium text-slate-500">{c.unit}</span>}
            </div>
            {c.status && <div className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold mt-0.5 sm:mt-1">{c.status}</div>}
            <div className={`mt-1 sm:mt-1.5 text-[10px] sm:text-[11px] font-semibold ${c.delta.positive ? 'text-emerald-600' : 'text-rose-500'}`}>
              <span className="whitespace-nowrap">{c.delta.positive ? '▼' : '▲'} {c.delta.value}</span>
              <span className="text-slate-400 font-normal ml-1 hidden sm:inline">desde o início</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
