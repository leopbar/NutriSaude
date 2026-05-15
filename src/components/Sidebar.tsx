import {
  LayoutDashboard, ClipboardList, BarChart3, Target,
  Dumbbell, Apple, Heart, Menu, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { patient } from '../data/eliane';

type Item = {
  icon: LucideIcon;
  label: string;
  targetId?: string;   // se preenchido, rola até esta seção
  default?: boolean;   // marcador inicial (Dashboard)
};

const items: Item[] = [
  { icon: LayoutDashboard, label: 'Dashboard',     default: true },
  { icon: ClipboardList,   label: 'Avaliações',    targetId: 'pareceres' },
  { icon: Target,          label: 'Metas',         targetId: 'metas' },
  { icon: BarChart3,       label: 'Análises',      targetId: 'historico' },
  { icon: Dumbbell,        label: 'Treinos',       targetId: 'treinos' },
  { icon: Apple,           label: 'Cardápio',      targetId: 'cardapio' },
];

export default function Sidebar() {
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState(() => items.findIndex(i => i.default));

  const handleClick = (idx: number, item: Item) => {
    setActive(idx);
    setOpen(false); // fecha drawer mobile
    if (item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (item.default) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ─── ScrollSpy: sincroniza o item ativo com a seção visível ───
  useEffect(() => {
    const dashIdx     = items.findIndex(i => i.default);
    const targetItems = items
      .map((item, idx) => ({ item, idx }))
      .filter(x => x.item.targetId);

    const handleScroll = () => {
      // Próximo do topo → Dashboard ativo
      if (window.scrollY < 250) {
        if (dashIdx !== -1) setActive(dashIdx);
        return;
      }

      // Linha de gatilho: 30% do topo da viewport
      const triggerY = window.innerHeight * 0.3;
      let bestIdx = -1;
      let bestTop = -Infinity;

      for (const { item, idx } of targetItems) {
        const el = document.getElementById(item.targetId!);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        // Seção que já cruzou a linha de gatilho, mais próxima dela (= entrou mais recentemente)
        if (top <= triggerY && top > bestTop) {
          bestTop = top;
          bestIdx = idx;
        }
      }

      if (bestIdx !== -1) setActive(bestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // estado inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-lg shadow-card"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5 text-slate-700" />
      </button>

      {/* Overlay mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          w-64 h-screen bg-white border-r border-slate-200
          flex flex-col flex-shrink-0
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Close button mobile */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-3 right-3 p-1.5 rounded-md hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-2">
          <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="text-[15px] font-bold leading-tight text-slate-800">NutriSaúde</div>
            <div className="text-[10px] text-slate-500">Saúde Integrada</div>
          </div>
        </div>

        {/* Patient */}
        <div className="px-5 pt-3 pb-4 text-center border-b border-slate-100">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-card bg-gradient-to-br from-brand-200 to-brand-400 flex items-center justify-center">
            <img
              src="/eliane.jpg"
              alt={patient.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback para iniciais se a imagem não estiver disponível
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent && !parent.querySelector('.initials-fallback')) {
                  const span = document.createElement('span');
                  span.className = 'initials-fallback text-white text-2xl font-bold';
                  span.textContent = patient.name.split(' ').map(n => n[0]).slice(0, 2).join('');
                  parent.appendChild(span);
                }
              }}
            />
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-800">{patient.name}</div>
          <div className="text-[11px] text-slate-600 font-medium">{patient.age} anos</div>
          <div className="text-[11px] text-slate-500">ID: {patient.id}</div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => handleClick(i, item)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                  transition-colors relative
                  ${isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                  }
                `}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-brand-500' : 'text-slate-400'}`} />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            );
          })}
        </nav>

      </aside>
    </>
  );
}
