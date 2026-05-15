import { ArrowRight, Check } from 'lucide-react';
import { GiBiceps } from 'react-icons/gi';
import { MdRestaurant, MdMonitorHeart } from 'react-icons/md';
import type { IconType } from 'react-icons';

type Theme = 'green' | 'blue' | 'orange';
type Item = { name: string; status: string };

type Card = {
  title: string;
  Icon: IconType;
  score: number;
  theme: Theme;
  items: Item[];
};

const cards: Card[] = [
  {
    title: 'Análise Nutricional', Icon: MdRestaurant, score: 90, theme: 'green',
    items: [
      { name: 'Ingestão Calórica',  status: 'Adequada' },
      { name: 'Macronutrientes',    status: 'Excelente' },
      { name: 'Hidratação',         status: 'Adequada' },
    ],
  },
  {
    title: 'Análise Endocrinológica', Icon: MdMonitorHeart, score: 85, theme: 'blue',
    items: [
      { name: 'Perfil Hormonal', status: 'Equilibrado' },
      { name: 'Tireóide',        status: 'Normal' },
      { name: 'Cortisol',        status: 'Adequado' },
    ],
  },
  {
    title: 'Personal Trainer', Icon: GiBiceps, score: 88, theme: 'orange',
    items: [
      { name: 'Performance',  status: 'Excelente' },
      { name: 'Força',        status: 'Evoluindo' },
      { name: 'Resistência',  status: 'Excelente' },
    ],
  },
];

const themes: Record<Theme, {
  bg: string; border: string; iconBg: string; iconColor: string;
  scoreText: string; scoreRing: string; link: string;
}> = {
  green: {
    bg: 'bg-emerald-50/60', border: 'border-emerald-100',
    iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600',
    scoreText: 'text-emerald-700', scoreRing: 'ring-emerald-200',
    link: 'text-emerald-600',
  },
  blue: {
    bg: 'bg-blue-50/60', border: 'border-blue-100',
    iconBg: 'bg-blue-100', iconColor: 'text-blue-600',
    scoreText: 'text-blue-700', scoreRing: 'ring-blue-200',
    link: 'text-blue-600',
  },
  orange: {
    bg: 'bg-orange-50/60', border: 'border-orange-100',
    iconBg: 'bg-orange-100', iconColor: 'text-orange-600',
    scoreText: 'text-orange-700', scoreRing: 'ring-orange-200',
    link: 'text-orange-600',
  },
};

export default function TeamCardCompact() {
  return (
    <>
      {cards.map((c, i) => {
        const t = themes[c.theme];
        return (
          <div
            key={i}
            className={`${t.bg} border ${t.border} rounded-2xl shadow-card p-4`}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className={`w-8 h-8 ${t.iconBg} ${t.iconColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                <c.Icon className="w-4 h-4" />
              </div>
              <h4 className="text-[13px] font-bold text-slate-800 flex-1 min-w-0 truncate">
                {c.title}
              </h4>
              <div className={`w-10 h-10 bg-white ring-2 ${t.scoreRing} ${t.scoreText} rounded-full flex items-center justify-center text-[14px] font-extrabold flex-shrink-0`}>
                {c.score}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-1 mb-2">
              {c.items.map((it, j) => (
                <div key={j} className="flex items-center justify-between text-[11px] gap-2">
                  <span className="flex items-center gap-1.5 text-slate-600 min-w-0">
                    <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{it.name}</span>
                  </span>
                  <span className="font-semibold text-slate-700 whitespace-nowrap">
                    {it.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer link */}
            <button className={`text-[11px] ${t.link} font-semibold flex items-center gap-1 hover:gap-1.5 transition-all`}>
              Ver detalhes <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </>
  );
}
