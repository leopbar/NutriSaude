import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { latest } from '../data/eliane';

const fmt = (v: number, d = 1) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function BodyComposition() {
  const slices = [
    { name: 'Massa Muscular', kg: latest.massaMuscular, color: '#22c55e' },
    { name: 'Massa Gorda',    kg: latest.massaGorda,    color: '#f59e0b' },
    { name: 'Água Corporal',  kg: latest.teorUmidade,   color: '#0ea5e9' },
    { name: 'Massa Óssea',    kg: latest.massaOssea,    color: '#8b5cf6' },
  ];
  const total = slices.reduce((s, x) => s + x.kg, 0);

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 h-full flex flex-col">
      <h3 className="text-[13px] font-bold text-slate-800">Composição Corporal — Atual</h3>

      {/* Donut centralizado */}
      <div className="flex-1 flex items-center justify-center my-3">
        <div className="relative w-full max-w-[200px] sm:max-w-[220px] aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="kg"
                cx="50%" cy="50%"
                innerRadius="62%" outerRadius="92%"
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {slices.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-2xl font-extrabold text-slate-800 leading-none">{fmt(latest.peso)}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">kg total</div>
          </div>
        </div>
      </div>

      {/* Legenda compacta */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-slate-100">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2 min-w-0">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-slate-700 truncate leading-tight">{s.name}</div>
              <div className="text-[12px] text-slate-500 leading-tight mt-0.5">
                {fmt(s.kg)} kg · {((s.kg / total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
