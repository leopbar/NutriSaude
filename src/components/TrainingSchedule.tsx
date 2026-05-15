import { Dumbbell, Heart, Flame, Activity, Timer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Exercise = { name: string; sets: string; tip?: string };
type Cardio   = { name: string; duration: string; intensity: string };

type Day = {
  weekday: string;
  focus: string;
  icon: LucideIcon;
  theme: 'green' | 'blue' | 'amber' | 'rose' | 'violet';
  exercises: Exercise[];
  cardio: Cardio;
};

const days: Day[] = [
  {
    weekday: 'Segunda', focus: 'Membros Inferiores · Glúteos e Pernas',
    icon: Dumbbell, theme: 'green',
    exercises: [
      { name: 'Agachamento livre',       sets: '4 × 12',  tip: 'Apoio total dos pés' },
      { name: 'Leg Press 45°',           sets: '4 × 15' },
      { name: 'Stiff com halteres',      sets: '3 × 12',  tip: 'Foco posterior' },
      { name: 'Cadeira Extensora',       sets: '3 × 15' },
      { name: 'Cadeira Flexora',         sets: '3 × 15' },
      { name: 'Panturrilha no Smith',    sets: '3 × 20' },
    ],
    cardio: { name: 'Esteira inclinada', duration: '25 min', intensity: 'Moderada (Zona 2)' },
  },
  {
    weekday: 'Terça', focus: 'Costas e Bíceps',
    icon: Dumbbell, theme: 'blue',
    exercises: [
      { name: 'Puxada Alta (pegada aberta)', sets: '4 × 12' },
      { name: 'Remada Curvada com barra',    sets: '4 × 10' },
      { name: 'Remada Baixa na polia',       sets: '3 × 12' },
      { name: 'Rosca Direta',                sets: '3 × 12' },
      { name: 'Rosca Alternada com halter',  sets: '3 × 12' },
      { name: 'Encolhimento de ombros',      sets: '3 × 15' },
    ],
    cardio: { name: 'HIIT Bike', duration: '20 min', intensity: 'Alta · 30s on / 90s off' },
  },
  {
    weekday: 'Quarta', focus: 'Aeróbico Longo + Core',
    icon: Heart, theme: 'rose',
    exercises: [
      { name: 'Prancha frontal',         sets: '3 × 45 seg' },
      { name: 'Prancha lateral',         sets: '3 × 30 seg cada lado' },
      { name: 'Abdominal Supra',         sets: '3 × 20' },
      { name: 'Russian Twist com peso',  sets: '3 × 20' },
      { name: 'Mountain Climber',        sets: '3 × 30 seg' },
      { name: 'Dead Bug',                sets: '3 × 12 cada lado' },
    ],
    cardio: { name: 'Caminhada / Corrida leve', duration: '45 min', intensity: 'Zona 2 — queima de gordura' },
  },
  {
    weekday: 'Quinta', focus: 'Membros Inferiores · Foco Glúteos',
    icon: Flame, theme: 'amber',
    exercises: [
      { name: 'Hip Thrust com barra',     sets: '4 × 12', tip: 'Contração máxima no topo' },
      { name: 'Afundo com halteres',      sets: '3 × 12 cada perna' },
      { name: 'Cadeira Abdutora',         sets: '4 × 15' },
      { name: 'Glúteo na polia (kickback)', sets: '3 × 15 cada lado' },
      { name: 'Elevação Pélvica unilateral', sets: '3 × 15' },
      { name: 'Agachamento Sumô',         sets: '3 × 15' },
    ],
    cardio: { name: 'Escada (StairMaster)', duration: '20 min', intensity: 'Moderada-Alta' },
  },
  {
    weekday: 'Sexta', focus: 'Peito, Ombros e Tríceps',
    icon: Dumbbell, theme: 'violet',
    exercises: [
      { name: 'Supino Reto com halteres', sets: '4 × 12' },
      { name: 'Crucifixo no banco',       sets: '3 × 12' },
      { name: 'Desenvolvimento Arnold',   sets: '3 × 12' },
      { name: 'Elevação Lateral',         sets: '3 × 15' },
      { name: 'Tríceps Pulley',           sets: '3 × 15' },
      { name: 'Tríceps Francês',          sets: '3 × 12' },
    ],
    cardio: { name: 'Bike ergométrica', duration: '25 min', intensity: 'Moderada' },
  },
];

const themes = {
  green:  { bar: 'bg-emerald-500', bg: 'bg-emerald-50',  text: 'text-emerald-700', soft: 'bg-emerald-100' },
  blue:   { bar: 'bg-blue-500',    bg: 'bg-blue-50',     text: 'text-blue-700',    soft: 'bg-blue-100' },
  rose:   { bar: 'bg-rose-500',    bg: 'bg-rose-50',     text: 'text-rose-700',    soft: 'bg-rose-100' },
  amber:  { bar: 'bg-amber-500',   bg: 'bg-amber-50',    text: 'text-amber-700',   soft: 'bg-amber-100' },
  violet: { bar: 'bg-violet-500',  bg: 'bg-violet-50',   text: 'text-violet-700',  soft: 'bg-violet-100' },
};

export default function TrainingSchedule() {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Resumo semanal */}
      <div className="bg-white rounded-2xl shadow-card p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <ResumeStat icon={Activity}    label="Frequência"      value="5x/semana" color="text-emerald-600 bg-emerald-50" />
        <ResumeStat icon={Dumbbell}    label="Treinos de Força" value="4 dias"    color="text-blue-600 bg-blue-50" />
        <ResumeStat icon={Heart}       label="Aeróbico"        value="1 longo + diário" color="text-rose-600 bg-rose-50" />
        <ResumeStat icon={Timer}       label="Duração média"   value="60-75 min" color="text-violet-600 bg-violet-50" />
      </div>

      {/* Cards dos dias */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4">
        {days.map((d, i) => {
          const t = themes[d.theme];
          const Icon = d.icon;
          return (
            <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col">
              {/* Header */}
              <div className={`${t.bar} px-4 py-3 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase font-bold tracking-wider opacity-90">{d.weekday}</div>
                    <div className="text-[12px] font-medium mt-0.5 leading-tight">{d.focus}</div>
                  </div>
                  <Icon className="w-5 h-5 opacity-90 flex-shrink-0" />
                </div>
              </div>

              {/* Exercícios */}
              <div className="p-4 flex-1 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                  Musculação
                </div>
                {d.exercises.map((e, j) => (
                  <div key={j} className="flex items-baseline justify-between gap-2 text-[12px]">
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-700 truncate">{e.name}</div>
                      {e.tip && <div className="text-[10px] text-slate-400 italic">{e.tip}</div>}
                    </div>
                    <span className={`${t.text} ${t.soft} font-bold text-[11px] px-2 py-0.5 rounded-full flex-shrink-0`}>
                      {e.sets}
                    </span>
                  </div>
                ))}
              </div>

              {/* Aeróbico */}
              <div className={`${t.bg} border-t border-slate-100 p-3`}>
                <div className="flex items-center gap-2 mb-1">
                  <Heart className={`w-3.5 h-3.5 ${t.text}`} />
                  <div className={`text-[10px] uppercase font-bold tracking-wider ${t.text}`}>Aeróbico</div>
                </div>
                <div className="text-[12px] font-semibold text-slate-700">{d.cardio.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  ⏱ {d.cardio.duration} · {d.cardio.intensity}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Observações */}
      <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-4 sm:p-5">
        <h4 className="text-[13px] font-bold text-slate-800 mb-2 flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-600" />
          Recomendações do Personal Trainer
        </h4>
        <ul className="text-[12px] text-slate-600 space-y-1.5 leading-relaxed">
          <li className="flex gap-2"><span className="text-brand-600 font-bold">•</span> <span><strong>Sábado e Domingo:</strong> descanso ativo — caminhada leve de 30 min ou alongamento.</span></li>
          <li className="flex gap-2"><span className="text-brand-600 font-bold">•</span> <span><strong>Massa óssea (atenção clínica):</strong> exercícios com impacto e carga progressiva 3x/semana para estímulo osteogênico.</span></li>
          <li className="flex gap-2"><span className="text-brand-600 font-bold">•</span> <span><strong>Hidratação:</strong> mínimo 35 ml/kg/dia (~2 L) — atualmente está hidratada (53,1%).</span></li>
          <li className="flex gap-2"><span className="text-brand-600 font-bold">•</span> <span><strong>Aquecimento:</strong> 5 min de mobilidade articular antes de cada treino.</span></li>
          <li className="flex gap-2"><span className="text-brand-600 font-bold">•</span> <span><strong>Progressão de carga:</strong> aumentar 2,5–5% a cada 2 semanas quando completar todas as séries com técnica perfeita.</span></li>
        </ul>
      </div>
    </div>
  );
}

function ResumeStat({
  icon: Icon, label, value, color,
}: { icon: LucideIcon; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[11px] text-slate-500 font-medium">{label}</div>
        <div className="text-[13px] font-bold text-slate-800">{value}</div>
      </div>
    </div>
  );
}
