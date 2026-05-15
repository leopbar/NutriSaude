import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LabelList,
} from 'recharts';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { measurements } from '../data/eliane';

type SeriesDef = {
  key: string; color: string; name: string;
  suffix?: string;
  labelPosition?: 'top' | 'bottom';
};

const series: Record<string, SeriesDef[]> = {
  combinado: [
    { key: 'peso',             color: '#22c55e', name: 'Peso (kg)',             labelPosition: 'top' },
    { key: 'massaMuscular',    color: '#3b82f6', name: 'Massa Muscular (kg)',   labelPosition: 'bottom' },
    { key: 'massaGorda',       color: '#ef4444', name: 'Massa Gorda (kg)',      labelPosition: 'bottom' },
    { key: 'gorduraCorporal',  color: '#f59e0b', name: 'Gordura Corporal (%)',  suffix: '%', labelPosition: 'top' },
  ],
  gorduras: [
    { key: 'gorduraCorporal',  color: '#f59e0b', name: 'Gordura Corporal (%)',  suffix: '%', labelPosition: 'top' },
    { key: 'gorduraSubcutanea',color: '#ec4899', name: 'Gordura Subcutânea (%)',suffix: '%', labelPosition: 'bottom' },
    { key: 'gorduraVisceral',  color: '#ef4444', name: 'Gordura Visceral',      labelPosition: 'bottom' },
  ],
  metabolico: [
    { key: 'tmb',              color: '#06b6d4', name: 'TMB (kcal)',            labelPosition: 'top' },
    { key: 'idadeMetabolica',  color: '#8b5cf6', name: 'Idade Metabólica',      labelPosition: 'bottom' },
    { key: 'aguaCorporal',     color: '#0ea5e9', name: 'Água Corporal (%)',     suffix: '%', labelPosition: 'top' },
  ],
};

const options: Array<{ id: keyof typeof series; label: string }> = [
  { id: 'combinado', label: 'Gráfico combinado' },
  { id: 'gorduras',  label: 'Análise de gorduras' },
  { id: 'metabolico',label: 'Perfil metabólico' },
];

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

export default function EvolutionChart() {
  const [view, setView] = useState<keyof typeof series>('combinado');
  const current = series[view];

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 sm:p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <h3 className="text-sm font-bold text-slate-800">Evolução Composta</h3>
        <div className="relative">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as any)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-medium text-slate-700 cursor-pointer hover:border-slate-300"
          >
            {options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={measurements} margin={{ top: 24, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
              cursor={{ stroke: '#cbd5e1', strokeDasharray: '3 3' }}
            />
            <Legend
              verticalAlign="top"
              align="left"
              iconType="circle"
              iconSize={9}
              wrapperStyle={{ fontSize: 12, paddingBottom: 14, paddingLeft: 4 }}
            />
            {current.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={2.5}
                dot={{ r: 5, fill: s.color, stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey={s.key}
                  position={s.labelPosition ?? 'top'}
                  offset={8}
                  formatter={(v: number) => `${fmt(v)}${s.suffix ?? ''}`}
                  style={{ fill: s.color, fontSize: 10, fontWeight: 600 }}
                />
              </Line>
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
