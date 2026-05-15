import { Coffee, Apple, UtensilsCrossed, Cookie, Moon, Soup } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Meal = {
  time: string;
  name: string;
  icon: LucideIcon;
  foods: string[];
  kcal: number;
};

type Day = {
  weekday: string;
  theme: 'green' | 'blue' | 'rose' | 'amber' | 'violet';
  meals: Meal[];
  macros: { protein: number; carbs: number; fat: number };
};

const days: Day[] = [
  {
    weekday: 'Segunda', theme: 'green',
    macros: { protein: 110, carbs: 140, fat: 50 },
    meals: [
      { time: '07:00', name: 'Café da Manhã', icon: Coffee,           kcal: 350,
        foods: ['2 ovos mexidos com ervas', '1 fatia de pão integral', 'Café preto sem açúcar', '½ mamão papaya'] },
      { time: '10:00', name: 'Lanche da Manhã', icon: Apple,          kcal: 180,
        foods: ['1 iogurte natural desnatado', '6 morangos', '1 col. sopa de granola'] },
      { time: '12:30', name: 'Almoço', icon: UtensilsCrossed,         kcal: 480,
        foods: ['120g peito de frango grelhado', '4 col. arroz integral', '2 col. feijão', 'Salada verde com azeite'] },
      { time: '15:30', name: 'Lanche da Tarde', icon: Cookie,         kcal: 170,
        foods: ['1 maçã', '10 amêndoas', 'Chá verde'] },
      { time: '19:30', name: 'Jantar', icon: Soup,                    kcal: 380,
        foods: ['150g tilápia grelhada', 'Brócolis no vapor', '130g batata-doce assada'] },
      { time: '21:30', name: 'Ceia', icon: Moon,                      kcal: 120,
        foods: ['Cottage com canela e cacau 100%'] },
    ],
  },
  {
    weekday: 'Terça', theme: 'blue',
    macros: { protein: 115, carbs: 135, fat: 48 },
    meals: [
      { time: '07:00', name: 'Café da Manhã', icon: Coffee,           kcal: 380,
        foods: ['Aveia em flocos (3 col.)', '1 banana', '1 scoop de whey protein', 'Canela a gosto'] },
      { time: '10:00', name: 'Lanche da Manhã', icon: Apple,          kcal: 200,
        foods: ['Mix de castanhas (20g)', '1 maçã'] },
      { time: '12:30', name: 'Almoço', icon: UtensilsCrossed,         kcal: 470,
        foods: ['120g patinho moído refogado', '4 col. quinoa', '2 col. lentilha', 'Salada de folhas e tomate'] },
      { time: '15:30', name: 'Lanche da Tarde', icon: Cookie,         kcal: 170,
        foods: ['Iogurte grego natural', '1 col. pasta de amendoim integral'] },
      { time: '19:30', name: 'Jantar', icon: Soup,                    kcal: 370,
        foods: ['Frango desfiado (120g)', 'Abobrinha e cenoura assadas', '3 col. arroz integral'] },
      { time: '21:30', name: 'Ceia', icon: Moon,                      kcal: 90,
        foods: ['Chá de camomila', '1 fatia de queijo branco'] },
    ],
  },
  {
    weekday: 'Quarta', theme: 'rose',
    macros: { protein: 105, carbs: 150, fat: 52 },
    meals: [
      { time: '07:00', name: 'Café da Manhã', icon: Coffee,           kcal: 340,
        foods: ['Tapioca pequena com queijo cottage', '1 ovo cozido', 'Café preto', '1 fatia de melão'] },
      { time: '10:00', name: 'Lanche da Manhã', icon: Apple,          kcal: 180,
        foods: ['Smoothie: leite vegetal + frutas vermelhas + chia'] },
      { time: '12:30', name: 'Almoço', icon: UtensilsCrossed,         kcal: 500,
        foods: ['150g salmão grelhado', '4 col. arroz 7 grãos', 'Legumes refogados (vagem, cenoura)', 'Salada de rúcula'] },
      { time: '15:30', name: 'Lanche da Tarde', icon: Cookie,         kcal: 180,
        foods: ['1 pera', '12 castanhas-do-pará (2 unidades)', 'Chá verde'] },
      { time: '19:30', name: 'Jantar', icon: Soup,                    kcal: 360,
        foods: ['Omelete (3 claras + 1 ovo) com espinafre', '1 batata-doce pequena (100g)', 'Salada verde'] },
      { time: '21:30', name: 'Ceia', icon: Moon,                      kcal: 100,
        foods: ['Iogurte desnatado com canela'] },
    ],
  },
  {
    weekday: 'Quinta', theme: 'amber',
    macros: { protein: 118, carbs: 130, fat: 50 },
    meals: [
      { time: '07:00', name: 'Café da Manhã', icon: Coffee,           kcal: 360,
        foods: ['Crepioca (1 ovo + 2 col. tapioca)', 'Recheio: peito de peru e queijo branco', 'Café preto', '1 kiwi'] },
      { time: '10:00', name: 'Lanche da Manhã', icon: Apple,          kcal: 170,
        foods: ['1 banana', '1 col. pasta de amendoim integral'] },
      { time: '12:30', name: 'Almoço', icon: UtensilsCrossed,         kcal: 490,
        foods: ['130g filé mignon grelhado', '4 col. arroz integral', 'Brócolis e couve-flor no vapor', 'Salada de folhas'] },
      { time: '15:30', name: 'Lanche da Tarde', icon: Cookie,         kcal: 180,
        foods: ['Vitamina: whey + leite desnatado + cacau 100%'] },
      { time: '19:30', name: 'Jantar', icon: Soup,                    kcal: 380,
        foods: ['Sopa de legumes com frango desfiado (120g)', '1 fatia de pão integral torrado'] },
      { time: '21:30', name: 'Ceia', icon: Moon,                      kcal: 110,
        foods: ['Chá de erva-doce', '2 castanhas-do-pará'] },
    ],
  },
  {
    weekday: 'Sexta', theme: 'violet',
    macros: { protein: 112, carbs: 145, fat: 50 },
    meals: [
      { time: '07:00', name: 'Café da Manhã', icon: Coffee,           kcal: 370,
        foods: ['Iogurte grego com granola integral', '1 scoop de whey', '½ banana picada', 'Café preto'] },
      { time: '10:00', name: 'Lanche da Manhã', icon: Apple,          kcal: 190,
        foods: ['1 maçã', 'Mix de castanhas (15g)'] },
      { time: '12:30', name: 'Almoço', icon: UtensilsCrossed,         kcal: 510,
        foods: ['130g sobrecoxa sem pele assada', '4 col. arroz integral', '2 col. feijão preto', 'Salada colorida + azeite'] },
      { time: '15:30', name: 'Lanche da Tarde', icon: Cookie,         kcal: 170,
        foods: ['Cottage com tomate-cereja', '4 biscoitos integrais'] },
      { time: '19:30', name: 'Jantar', icon: Soup,                    kcal: 380,
        foods: ['150g atum grelhado', 'Mandioquinha (100g)', 'Aspargos no vapor'] },
      { time: '21:30', name: 'Ceia', icon: Moon,                      kcal: 100,
        foods: ['Chá relaxante', '1 fatia de queijo branco'] },
    ],
  },
];

const themes = {
  green:  { bar: 'bg-emerald-500', bg: 'bg-emerald-50',  text: 'text-emerald-700' },
  blue:   { bar: 'bg-blue-500',    bg: 'bg-blue-50',     text: 'text-blue-700' },
  rose:   { bar: 'bg-rose-500',    bg: 'bg-rose-50',     text: 'text-rose-700' },
  amber:  { bar: 'bg-amber-500',   bg: 'bg-amber-50',    text: 'text-amber-700' },
  violet: { bar: 'bg-violet-500',  bg: 'bg-violet-50',   text: 'text-violet-700' },
};

export default function MealPlan() {
  const avgKcal = Math.round(
    days.reduce((s, d) => s + d.meals.reduce((a, m) => a + m.kcal, 0), 0) / days.length
  );
  const avgProtein = Math.round(days.reduce((s, d) => s + d.macros.protein, 0) / days.length);
  const avgCarbs   = Math.round(days.reduce((s, d) => s + d.macros.carbs,   0) / days.length);
  const avgFat     = Math.round(days.reduce((s, d) => s + d.macros.fat,     0) / days.length);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Resumo nutricional médio */}
      <div className="bg-white rounded-2xl shadow-card p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Calorias diárias" value={`~${avgKcal} kcal`} sub="Média semanal" color="text-emerald-600 bg-emerald-50" />
        <Stat label="Proteína"         value={`${avgProtein}g`}   sub={`~1,9 g/kg`}      color="text-blue-600 bg-blue-50" />
        <Stat label="Carboidratos"     value={`${avgCarbs}g`}     sub="Integrais e complexos" color="text-amber-600 bg-amber-50" />
        <Stat label="Gorduras boas"    value={`${avgFat}g`}       sub="Insaturadas"      color="text-rose-600 bg-rose-50" />
      </div>

      {/* Cards dos dias */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4">
        {days.map((d, i) => {
          const t = themes[d.theme];
          const total = d.meals.reduce((s, m) => s + m.kcal, 0);
          return (
            <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col">
              {/* Header */}
              <div className={`${t.bar} px-4 py-3 text-white flex items-center justify-between`}>
                <div>
                  <div className="text-[11px] uppercase font-bold tracking-wider opacity-90">{d.weekday}</div>
                  <div className="text-[11px] mt-0.5 opacity-90">Total: <span className="font-bold">{total} kcal</span></div>
                </div>
                <UtensilsCrossed className="w-5 h-5 opacity-90 flex-shrink-0" />
              </div>

              {/* Refeições */}
              <div className="p-3 flex-1 space-y-3">
                {d.meals.map((m, j) => {
                  const Icon = m.icon;
                  return (
                    <div key={j} className="border-l-2 border-slate-200 pl-3">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <Icon className={`w-3.5 h-3.5 ${t.text}`} />
                          <span className="text-[10px] font-bold text-slate-500">{m.time}</span>
                          <span className="text-[11px] font-bold text-slate-800">{m.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold ${t.text} ${t.bg} px-1.5 py-0.5 rounded`}>
                          {m.kcal} kcal
                        </span>
                      </div>
                      <ul className="text-[11px] text-slate-600 space-y-0.5">
                        {m.foods.map((f, k) => (
                          <li key={k} className="flex gap-1 leading-tight">
                            <span className="text-slate-400 flex-shrink-0">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Macros do dia */}
              <div className={`${t.bg} border-t border-slate-100 p-2.5 grid grid-cols-3 gap-1 text-center`}>
                <div>
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wide">Prot.</div>
                  <div className={`text-[12px] font-extrabold ${t.text}`}>{d.macros.protein}g</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wide">Carb.</div>
                  <div className={`text-[12px] font-extrabold ${t.text}`}>{d.macros.carbs}g</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wide">Gord.</div>
                  <div className={`text-[12px] font-extrabold ${t.text}`}>{d.macros.fat}g</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Observações da nutricionista */}
      <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-4 sm:p-5">
        <h4 className="text-[13px] font-bold text-slate-800 mb-2 flex items-center gap-2">
          <Apple className="w-4 h-4 text-emerald-600" />
          Recomendações da Nutricionista
        </h4>
        <ul className="text-[12px] text-slate-600 space-y-1.5 leading-relaxed">
          <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span><strong>Sábado:</strong> refeição livre permitida (1 por semana) — preferir almoço, manter proteína.</span></li>
          <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span><strong>Domingo:</strong> seguir cardápio base ou repetir o dia mais agradável da semana.</span></li>
          <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span><strong>Hidratação:</strong> 2 a 2,5 L de água/dia, distribuídos ao longo do dia (1 copo a cada 1-2h).</span></li>
          <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span><strong>Pré-treino:</strong> banana com 1 col. pasta de amendoim 30-40 min antes.</span></li>
          <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span><strong>Pós-treino:</strong> whey protein + carboidrato simples (banana ou fruta) até 30 min após.</span></li>
          <li className="flex gap-2"><span className="text-emerald-600 font-bold">•</span> <span><strong>Suplementação:</strong> Vitamina D 2.000 UI + Cálcio (massa óssea), Ômega-3 1g/dia.</span></li>
        </ul>
      </div>
    </div>
  );
}

function Stat({
  label, value, sub, color,
}: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <UtensilsCrossed className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] text-slate-500 font-medium truncate">{label}</div>
        <div className="text-[14px] font-extrabold text-slate-800">{value}</div>
        <div className="text-[10px] text-slate-400 truncate">{sub}</div>
      </div>
    </div>
  );
}
